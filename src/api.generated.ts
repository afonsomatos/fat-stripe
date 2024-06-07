import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const id = z.object({ id: z.number().int() }).partial().passthrough();
const new_sales_document = z
    .object({
        document_type: z.string(),
        date: z.string().optional(),
        document_series_id: z.number().int().optional(),
        document_series_prefix: z.string().optional(),
        customer_id: z.number().int().optional(),
        customer_tax_registration_number: z.string().optional(),
        customer_business_name: z.string().optional(),
        customer_address_detail: z.string().optional(),
        customer_postcode: z.string().optional(),
        customer_city: z.string().optional(),
        customer_country: z.string().optional(),
        due_date: z.string().optional(),
        settlement_expression: z.string().optional(),
        payment_mechanism: z.string().optional(),
        bank_account_id: z.number().int().optional(),
        cash_account_id: z.number().int().optional(),
        vat_included_prices: z.boolean().optional(),
        tax_exemption_reason_id: z.number().int().optional(),
        operation_country: z.string().optional(),
        currency_id: z.number().int().optional(),
        currency_iso_code: z.string().optional(),
        currency_conversion_rate: z.number().optional(),
        retention: z.number().optional(),
        retention_type: z.string().optional(),
        apply_retention_when_paid: z.boolean().optional(),
        notes: z.string().optional(),
        external_reference: z.string().optional()
    })
    .passthrough();
const existing_sales_document = id.and(new_sales_document);
const existing_sales_document_line = z
    .object({
        id: z.number().int(),
        item_type: z.string(),
        item_id: z.number().int(),
        item_code: z.string(),
        description: z.string(),
        unit_of_measure_id: z.number().int(),
        unit_of_measure: z.string(),
        quantity: z.number(),
        unit_price: z.number(),
        settlement_expression: z.string(),
        tax_id: z.number().int(),
        tax_code: z.string(),
        tax_percentage: z.number(),
        tax_country_region: z.string()
    })
    .partial()
    .passthrough();
const existing_sales_document_lines = z
    .object({ lines: z.array(existing_sales_document_line) })
    .partial()
    .passthrough();
const sales_document_list_response = z.array(
    existing_sales_document
        .and(z.object({ url: z.string() }).partial().passthrough())
        .and(existing_sales_document_lines)
);
const document_process_flags = z.object({ finalize: z.boolean(), return_pdf: z.boolean() }).partial().passthrough();
const new_sales_document_line = z
    .object({
        item_type: z.string(),
        item_id: z.number().int(),
        item_code: z.string(),
        description: z.string(),
        unit_of_measure_id: z.number().int(),
        unit_of_measure: z.string(),
        quantity: z.number(),
        unit_price: z.number(),
        settlement_expression: z.string(),
        tax_id: z.number().int(),
        tax_code: z.string(),
        tax_percentage: z.number(),
        tax_country_region: z.string()
    })
    .partial()
    .passthrough();
const new_sales_document_lines = z
    .object({ lines: z.array(new_sales_document_line) })
    .partial()
    .passthrough();
const sales_document_request = new_sales_document.and(document_process_flags).and(new_sales_document_lines);
const sales_document_response = existing_sales_document
    .and(z.object({ url: z.string() }).partial().passthrough())
    .and(existing_sales_document_lines);
const sales_document_patch_request = existing_sales_document
    .and(document_process_flags)
    .and(existing_sales_document_lines);
const finalize_request = z.object({ return_pdf: z.boolean() }).partial().passthrough();
const void_request = z.object({ voided_reason: z.string() }).passthrough();
const new_purchases_document = z
    .object({
        document_type: z.string(),
        date: z.string().optional(),
        document_series_id: z.number().int().optional(),
        document_series_prefix: z.string().optional(),
        supplier_id: z.number().int().optional(),
        supplier_tax_registration_number: z.string().optional(),
        supplier_business_name: z.string().optional(),
        supplier_address_detail: z.string().optional(),
        supplier_postcode: z.string().optional(),
        supplier_city: z.string().optional(),
        supplier_country: z.string().optional(),
        due_date: z.string().optional(),
        settlement_expression: z.string().optional(),
        vat_included_prices: z.boolean().optional(),
        tax_exemption_reason_id: z.number().int().optional(),
        currency_id: z.number().int().optional(),
        currency_iso_code: z.string().optional(),
        currency_conversion_rate: z.number().optional(),
        retention_total: z.number().optional(),
        retention_type: z.string().optional(),
        notes: z.string().optional(),
        external_reference: z.string().optional()
    })
    .passthrough();
const existing_purchases_document = id.and(new_purchases_document);
const existing_purchases_document_line = z
    .object({
        id: z.number().int(),
        item_type: z.string(),
        item_id: z.number().int(),
        item_code: z.string(),
        description: z.string(),
        unit_of_measure_id: z.number().int(),
        unit_of_measure: z.string(),
        quantity: z.number(),
        unit_price: z.number(),
        settlement_expression: z.string(),
        tax_id: z.number().int(),
        tax_code: z.string(),
        tax_percentage: z.number(),
        tax_country_region: z.string()
    })
    .partial()
    .passthrough();
const existing_purchases_document_lines = z
    .object({ lines: z.array(existing_purchases_document_line) })
    .partial()
    .passthrough();
const purchases_document_list_response = z.array(
    existing_purchases_document
        .and(z.object({ url: z.string() }).partial().passthrough())
        .and(existing_purchases_document_lines)
);
const new_purchases_document_line = z
    .object({
        item_type: z.string(),
        item_id: z.number().int(),
        item_code: z.string(),
        description: z.string(),
        unit_of_measure_id: z.number().int(),
        unit_of_measure: z.string(),
        quantity: z.number(),
        unit_price: z.number(),
        settlement_expression: z.string(),
        tax_id: z.number().int(),
        tax_code: z.string(),
        tax_percentage: z.number(),
        tax_country_region: z.string()
    })
    .partial()
    .passthrough();
const new_purchases_document_lines = z
    .object({ lines: z.array(new_purchases_document_line) })
    .partial()
    .passthrough();
const purchases_document_request = new_purchases_document.and(document_process_flags).and(new_purchases_document_lines);
const purchases_document_response = existing_purchases_document
    .and(z.object({ url: z.string() }).partial().passthrough())
    .and(existing_purchases_document_lines);
const purchases_document_patch_request = existing_purchases_document
    .and(document_process_flags)
    .and(existing_purchases_document_lines);
const new_receipt = z
    .object({
        date: z.string(),
        payment_mechanism: z.string(),
        document_series_id: z.number().int(),
        bank_account_id: z.number().int(),
        cash_account_id: z.number().int()
    })
    .partial()
    .passthrough();
const receipt_process_flags = z.object({ return_pdf: z.boolean() }).partial().passthrough();
const new_receipt_line = z
    .object({
        receivable_type: z.string(),
        receivable_id: z.number().int(),
        received_value: z.number().optional(),
        settlement_percentage: z.string().optional()
    })
    .passthrough();
const new_receipt_lines = z
    .object({ lines: z.array(new_receipt_line) })
    .partial()
    .passthrough();
const receipt_request = new_receipt.and(receipt_process_flags).and(new_receipt_lines);
const existing_receipt = id.and(new_receipt);
const existing_receipt_line = z
    .object({
        id: z.number().int(),
        receivable_type: z.string(),
        receivable_id: z.number().int(),
        received_value: z.number(),
        settlement_percentage: z.number()
    })
    .partial()
    .passthrough();
const existing_receipt_lines = z
    .object({ lines: z.array(existing_receipt_line) })
    .partial()
    .passthrough();
const receipt_response = existing_receipt
    .and(z.object({ url: z.string() }).partial().passthrough())
    .and(existing_receipt_lines);
const receipt_patch_request = existing_receipt.and(receipt_process_flags).and(existing_receipt_lines);
const new_payment = z
    .object({
        date: z.string(),
        payment_mechanism: z.string(),
        document_series_id: z.number().int(),
        bank_account_id: z.number().int(),
        cash_account_id: z.number().int()
    })
    .partial()
    .passthrough();
const new_payment_line = z
    .object({
        payable_type: z.string(),
        payable_id: z.number().int(),
        paid_value: z.number().optional(),
        settlement_percentage: z.number().optional()
    })
    .passthrough();
const new_payment_lines = z
    .object({ lines: z.array(new_payment_line) })
    .partial()
    .passthrough();
const payment_request = new_payment.and(receipt_process_flags).and(new_payment_lines);
const existing_payment = id.and(new_payment);
const existing_payment_line = z
    .object({
        id: z.number().int(),
        payable_type: z.string(),
        payable_id: z.number().int(),
        paid_value: z.number(),
        settlement_percentage: z.number()
    })
    .partial()
    .passthrough();
const existing_payment_lines = z
    .object({ lines: z.array(existing_payment_line) })
    .partial()
    .passthrough();
const payment_response = existing_payment
    .and(z.object({ url: z.string() }).partial().passthrough())
    .and(existing_payment_lines);
const payment_patch_request = existing_payment.and(receipt_process_flags).and(existing_payment_lines);

export const schemas = {
    id,
    new_sales_document,
    existing_sales_document,
    existing_sales_document_line,
    existing_sales_document_lines,
    sales_document_list_response,
    document_process_flags,
    new_sales_document_line,
    new_sales_document_lines,
    sales_document_request,
    sales_document_response,
    sales_document_patch_request,
    finalize_request,
    void_request,
    new_purchases_document,
    existing_purchases_document,
    existing_purchases_document_line,
    existing_purchases_document_lines,
    purchases_document_list_response,
    new_purchases_document_line,
    new_purchases_document_lines,
    purchases_document_request,
    purchases_document_response,
    purchases_document_patch_request,
    new_receipt,
    receipt_process_flags,
    new_receipt_line,
    new_receipt_lines,
    receipt_request,
    existing_receipt,
    existing_receipt_line,
    existing_receipt_lines,
    receipt_response,
    receipt_patch_request,
    new_payment,
    new_payment_line,
    new_payment_lines,
    payment_request,
    existing_payment,
    existing_payment_line,
    existing_payment_lines,
    payment_response,
    payment_patch_request
};

const endpoints = makeApi([
    {
        method: "get",
        path: "/v1/commercial_purchases_documents",
        requestFormat: "json",
        response: purchases_document_list_response
    },
    {
        method: "post",
        path: "/v1/commercial_purchases_documents",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: purchases_document_request
            }
        ],
        response: purchases_document_response
    },
    {
        method: "get",
        path: "/v1/commercial_purchases_documents/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: purchases_document_response
    },
    {
        method: "delete",
        path: "/v1/commercial_purchases_documents/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: z.void()
    },
    {
        method: "patch",
        path: "/v1/commercial_purchases_documents/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: purchases_document_patch_request
            },
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: purchases_document_response
    },
    {
        method: "patch",
        path: "/v1/commercial_purchases_documents/:id/finalize",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: z.object({ return_pdf: z.boolean() }).partial().passthrough()
            },
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: purchases_document_response
    },
    {
        method: "delete",
        path: "/v1/commercial_purchases_documents/:id/lines/:lineId",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            },
            {
                name: "lineId",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: z.void()
    },
    {
        method: "patch",
        path: "/v1/commercial_purchases_documents/:id/void",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: z.object({ voided_reason: z.string() }).passthrough()
            },
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: purchases_document_response
    },
    {
        method: "post",
        path: "/v1/commercial_purchases_payments",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: payment_request
            }
        ],
        response: payment_response
    },
    {
        method: "get",
        path: "/v1/commercial_purchases_payments/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: payment_response
    },
    {
        method: "delete",
        path: "/v1/commercial_purchases_payments/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: z.void()
    },
    {
        method: "patch",
        path: "/v1/commercial_purchases_payments/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: payment_patch_request
            },
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: payment_response
    },
    {
        method: "patch",
        path: "/v1/commercial_purchases_payments/:id/void",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: payment_response
    },
    {
        method: "get",
        path: "/v1/commercial_sales_documents",
        requestFormat: "json",
        response: sales_document_list_response
    },
    {
        method: "post",
        path: "/v1/commercial_sales_documents",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: sales_document_request
            }
        ],
        response: sales_document_response
    },
    {
        method: "get",
        path: "/v1/commercial_sales_documents/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: sales_document_response
    },
    {
        method: "delete",
        path: "/v1/commercial_sales_documents/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: z.void()
    },
    {
        method: "patch",
        path: "/v1/commercial_sales_documents/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: sales_document_patch_request
            },
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: sales_document_response
    },
    {
        method: "patch",
        path: "/v1/commercial_sales_documents/:id/finalize",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: z.object({ return_pdf: z.boolean() }).partial().passthrough()
            },
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: sales_document_response
    },
    {
        method: "delete",
        path: "/v1/commercial_sales_documents/:id/lines/:lineId",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            },
            {
                name: "lineId",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: z.void()
    },
    {
        method: "patch",
        path: "/v1/commercial_sales_documents/:id/void",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: z.object({ voided_reason: z.string() }).passthrough()
            },
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: sales_document_response
    },
    {
        method: "post",
        path: "/v1/commercial_sales_receipts",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: receipt_request
            }
        ],
        response: receipt_response
    },
    {
        method: "get",
        path: "/v1/commercial_sales_receipts/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: receipt_response
    },
    {
        method: "delete",
        path: "/v1/commercial_sales_receipts/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: z.void()
    },
    {
        method: "patch",
        path: "/v1/commercial_sales_receipts/:id",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: receipt_patch_request
            },
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: receipt_response
    },
    {
        method: "patch",
        path: "/v1/commercial_sales_receipts/:id/void",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.number().int()
            }
        ],
        response: receipt_response
    }
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
