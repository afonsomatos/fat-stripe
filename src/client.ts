import axios, {Axios} from "axios";

const euCountryCodes = [
    "AT", // Austria
    "BE", // Belgium
    "BG", // Bulgaria
    "HR", // Croatia
    "CY", // Cyprus
    "CZ", // Czech Republic
    "DK", // Denmark
    "EE", // Estonia
    "FI", // Finland
    "FR", // France
    "DE", // Germany
    "GR", // Greece
    "HU", // Hungary
    "IE", // Ireland
    "IT", // Italy
    "LV", // Latvia
    "LT", // Lithuania
    "LU", // Luxembourg
    "MT", // Malta
    "NL", // Netherlands
    "PT", // Portugal
    "PL", // Poland
    "RO", // Romania
    "SK", // Slovakia
    "SI", // Slovenia
    "ES", // Spain
    "SE" // Sweden
];

export interface ICredentials {
    client_id: string;
    client_secret: string;
}

async function getAccessToken(baseUrl: string, credentials: ICredentials) {
    const base = new Axios({ baseURL: baseUrl });
    // Obtain code
    const codeRes = await base.get("/oauth/auth", {
        maxRedirects: 0,
        params: {
            client_id: credentials.client_id,
            scope: "commercial",
            response_type: "code",
            redirect_uri: "https://oauth.pstmn.io/v1/callback"
        },
        headers: {
            "Content-Type": "application/json"
        }
    });
    const code = new URL(codeRes.headers.location!).searchParams.get("code")!;
    const res = await base.post(
        "/oauth/token",
        new URLSearchParams({
            code,
            grant_type: "authorization_code",
            scope: "commercial"
        }).toString(),
        {
            auth: { username: credentials.client_id, password: credentials.client_secret },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json"
            }
        }
    );
    const data = JSON.parse(res.data);
    return data.access_token;
}

export interface IEmitCloudwareInvoiceArgs {
    customer: {
        name?: string;
        address?: string;
        postcode?: string;
        city?: string;
        country: string;
        taxId?: string;
    };
    price: number;
    description: string;
    date: string;
    external_reference: string;
}


export class CloudwareClient {
    static async create(baseURL: string, credentials: ICredentials) {
        const accessToken = await getAccessToken(baseURL, credentials);
        return new CloudwareClient(baseURL, accessToken);
    }

    constructor(private baseURL: string, private readonly accessToken: string) {
        //
    }

    async emitInvoice(args: IEmitCloudwareInvoiceArgs): Promise<{ id: number }> {
        const res = await axios
            .post(
                "/api/v1/commercial_sales_documents",
                {
                    document_type: "FR",
                    document_series_prefix: "X",
                    customer_business_name: args.customer.name,
                    vat_included_prices: true,
                    currency_iso_code: "USD",
                    date: args.date,
                    customer_country: args.customer.country,
                    customer_address_detail: args.customer.address,
                    customer_postcode: args.customer.postcode,
                    currency_conversion_rate: 1.09,
                    external_reference: args.external_reference,

                    ...(args.customer.taxId ? { customer_tax_registration_number: args.customer.taxId } : {}),

                    ...(args.customer.country === "PT"
                        ? {}
                        : euCountryCodes.includes(args.customer.country)
                            ? { tax_exemption_reason_id: 26 }
                            : { tax_exemption_reason_id: 7 }),

                    lines: [
                        {
                            unit_price: args.price,
                            description: args.description,
                            ...(args.customer.country === "PT" ? { tax_code: "NOR" } : { tax_code: "ISE" })
                        }
                    ]
                },
                {
                    baseURL: this.baseURL,
                    headers: {
                        "Content-Type": "application/vnd.api+json",
                        Accept: "application/json",
                        Authorization: `Bearer ${this.accessToken}`
                    }
                }
            )
            .catch((e) => {
                console.log(e);
                throw e;
            });

        return { id: res.data.id };
    }
}