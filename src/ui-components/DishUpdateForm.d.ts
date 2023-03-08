/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Dish } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DishUpdateFormInputValues = {
    name?: string;
    type?: string;
    tags?: string[];
    size?: string;
    time?: string;
    description?: string;
    instructions?: string;
};
export declare type DishUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    tags?: ValidationFunction<string>;
    size?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    instructions?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DishUpdateFormOverridesProps = {
    DishUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    tags?: PrimitiveOverrideProps<TextFieldProps>;
    size?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    instructions?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DishUpdateFormProps = React.PropsWithChildren<{
    overrides?: DishUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    dish?: Dish;
    onSubmit?: (fields: DishUpdateFormInputValues) => DishUpdateFormInputValues;
    onSuccess?: (fields: DishUpdateFormInputValues) => void;
    onError?: (fields: DishUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DishUpdateFormInputValues) => DishUpdateFormInputValues;
    onValidate?: DishUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DishUpdateForm(props: DishUpdateFormProps): React.ReactElement;
