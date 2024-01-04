/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type IngredientCreateFormInputValues = {
    name?: string;
    type?: string;
    unit?: string;
};
export declare type IngredientCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    unit?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IngredientCreateFormOverridesProps = {
    IngredientCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    unit?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IngredientCreateFormProps = React.PropsWithChildren<{
    overrides?: IngredientCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: IngredientCreateFormInputValues) => IngredientCreateFormInputValues;
    onSuccess?: (fields: IngredientCreateFormInputValues) => void;
    onError?: (fields: IngredientCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IngredientCreateFormInputValues) => IngredientCreateFormInputValues;
    onValidate?: IngredientCreateFormValidationValues;
} & React.CSSProperties>;
export default function IngredientCreateForm(props: IngredientCreateFormProps): React.ReactElement;
