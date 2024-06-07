import { Stripe } from "stripe";
import moment from "moment";
import _ from "lodash";
import { type IEmitCloudwareInvoiceArgs } from "./client";

export function convertInvoiceToCloudwareArgs(invoice: Stripe.Invoice): IEmitCloudwareInvoiceArgs {
    return {
        customer: {
            country: invoice.customer_address?.country || "US",
            postcode: invoice.customer_address?.postal_code || undefined,
            city: invoice.customer_address?.city || undefined,
            address: _.compact([invoice.customer_address?.line1, invoice.customer_address?.line2]).join(", "),
            name: invoice.customer_name || invoice.customer_email || undefined,
            taxId: invoice.customer_tax_ids?.[0]?.value || undefined
        },
        date: moment.unix(invoice.created).format("YYYY-MM-DD"),
        description: "Stripe Payment",
        price: invoice.amount_paid / 100,
        external_reference: invoice.id
    };
}
