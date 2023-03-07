/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DishCreateFormInputValues = {
    name?: string;
    type?: string;
    size?: string;
    time?: string;
    description?: string;
    instructions?: string;
};
export declare type DishCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    size?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    instructions?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DishCreateFormOverridesProps = {
    DishCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    size?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    instructions?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DishCreateFormProps = React.PropsWithChildren<{
    overrides?: DishCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DishCreateFormInputValues) => DishCreateFormInputValues;
    onSuccess?: (fields: DishCreateFormInputValues) => void;
    onError?: (fields: DishCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DishCreateFormInputValues) => DishCreateFormInputValues;
    onValidate?: DishCreateFormValidationValues;
} & React.CSSProperties>;
export default function DishCreateForm(props: DishCreateFormProps): React.ReactElement;
