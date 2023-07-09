/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Ingredient } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type IngredientUpdateFormInputValues = {
    name?: string;
    type?: string;
    unit?: string;
};
export declare type IngredientUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    unit?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IngredientUpdateFormOverridesProps = {
    IngredientUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    unit?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IngredientUpdateFormProps = React.PropsWithChildren<{
    overrides?: IngredientUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    ingredient?: Ingredient;
    onSubmit?: (fields: IngredientUpdateFormInputValues) => IngredientUpdateFormInputValues;
    onSuccess?: (fields: IngredientUpdateFormInputValues) => void;
    onError?: (fields: IngredientUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IngredientUpdateFormInputValues) => IngredientUpdateFormInputValues;
    onValidate?: IngredientUpdateFormValidationValues;
} & React.CSSProperties>;
export default function IngredientUpdateForm(props: IngredientUpdateFormProps): React.ReactElement;
