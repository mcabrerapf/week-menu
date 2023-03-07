/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Menu } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MenuUpdateFormInputValues = {
    name?: string;
    favourite?: boolean;
};
export declare type MenuUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    favourite?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MenuUpdateFormOverridesProps = {
    MenuUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    favourite?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type MenuUpdateFormProps = React.PropsWithChildren<{
    overrides?: MenuUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    menu?: Menu;
    onSubmit?: (fields: MenuUpdateFormInputValues) => MenuUpdateFormInputValues;
    onSuccess?: (fields: MenuUpdateFormInputValues) => void;
    onError?: (fields: MenuUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MenuUpdateFormInputValues) => MenuUpdateFormInputValues;
    onValidate?: MenuUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MenuUpdateForm(props: MenuUpdateFormProps): React.ReactElement;
