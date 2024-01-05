/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type MenuCreateFormInputValues = {
    name?: string;
    favourite?: boolean;
    description?: string;
    tags?: string[];
    dessert?: string[];
    snacks?: string[];
};
export declare type MenuCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    favourite?: ValidationFunction<boolean>;
    description?: ValidationFunction<string>;
    tags?: ValidationFunction<string>;
    dessert?: ValidationFunction<string>;
    snacks?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MenuCreateFormOverridesProps = {
    MenuCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    favourite?: PrimitiveOverrideProps<SwitchFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    tags?: PrimitiveOverrideProps<TextFieldProps>;
    dessert?: PrimitiveOverrideProps<TextFieldProps>;
    snacks?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MenuCreateFormProps = React.PropsWithChildren<{
    overrides?: MenuCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MenuCreateFormInputValues) => MenuCreateFormInputValues;
    onSuccess?: (fields: MenuCreateFormInputValues) => void;
    onError?: (fields: MenuCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MenuCreateFormInputValues) => MenuCreateFormInputValues;
    onValidate?: MenuCreateFormValidationValues;
} & React.CSSProperties>;
export default function MenuCreateForm(props: MenuCreateFormProps): React.ReactElement;
