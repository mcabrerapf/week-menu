/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Ingredient } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function IngredientUpdateForm(props) {
  const {
    id: idProp,
    ingredient,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    type: undefined,
    unit: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [type, setType] = React.useState(initialValues.type);
  const [unit, setUnit] = React.useState(initialValues.unit);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = ingredientRecord
      ? { ...initialValues, ...ingredientRecord }
      : initialValues;
    setName(cleanValues.name);
    setType(cleanValues.type);
    setUnit(cleanValues.unit);
    setErrors({});
  };
  const [ingredientRecord, setIngredientRecord] = React.useState(ingredient);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Ingredient, idProp)
        : ingredient;
      setIngredientRecord(record);
    };
    queryData();
  }, [idProp, ingredient]);
  React.useEffect(resetStateValues, [ingredientRecord]);
  const validations = {
    name: [{ type: "Required" }],
    type: [],
    unit: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          type,
          unit,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Ingredient.copyOf(ingredientRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "IngredientUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              type,
              unit,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type: value,
              unit,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Other"
          value="OTHER"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Meat"
          value="MEAT"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
        <option
          children="Fruit"
          value="FRUIT"
          {...getOverrideProps(overrides, "typeoption2")}
        ></option>
        <option
          children="Vegetable"
          value="VEGETABLE"
          {...getOverrideProps(overrides, "typeoption3")}
        ></option>
        <option
          children="Sauce"
          value="SAUCE"
          {...getOverrideProps(overrides, "typeoption4")}
        ></option>
        <option
          children="Liquor"
          value="LIQUOR"
          {...getOverrideProps(overrides, "typeoption5")}
        ></option>
        <option
          children="Fish"
          value="FISH"
          {...getOverrideProps(overrides, "typeoption6")}
        ></option>
      </SelectField>
      <SelectField
        label="Unit"
        placeholder="Please select an option"
        isDisabled={false}
        value={unit}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              unit: value,
            };
            const result = onChange(modelFields);
            value = result?.unit ?? value;
          }
          if (errors.unit?.hasError) {
            runValidationTasks("unit", value);
          }
          setUnit(value);
        }}
        onBlur={() => runValidationTasks("unit", unit)}
        errorMessage={errors.unit?.errorMessage}
        hasError={errors.unit?.hasError}
        {...getOverrideProps(overrides, "unit")}
      >
        <option
          children="Un"
          value="UN"
          {...getOverrideProps(overrides, "unitoption0")}
        ></option>
        <option
          children="G"
          value="G"
          {...getOverrideProps(overrides, "unitoption1")}
        ></option>
        <option
          children="Kg"
          value="KG"
          {...getOverrideProps(overrides, "unitoption2")}
        ></option>
        <option
          children="L"
          value="L"
          {...getOverrideProps(overrides, "unitoption3")}
        ></option>
        <option
          children="Tsp"
          value="TSP"
          {...getOverrideProps(overrides, "unitoption4")}
        ></option>
        <option
          children="Tbsp"
          value="TBSP"
          {...getOverrideProps(overrides, "unitoption5")}
        ></option>
        <option
          children="Pt"
          value="PT"
          {...getOverrideProps(overrides, "unitoption6")}
        ></option>
        <option
          children="Qt"
          value="QT"
          {...getOverrideProps(overrides, "unitoption7")}
        ></option>
        <option
          children="Oz"
          value="OZ"
          {...getOverrideProps(overrides, "unitoption8")}
        ></option>
        <option
          children="Lb"
          value="LB"
          {...getOverrideProps(overrides, "unitoption9")}
        ></option>
        <option
          children="Ml"
          value="ML"
          {...getOverrideProps(overrides, "unitoption10")}
        ></option>
        <option
          children="Doz"
          value="DOZ"
          {...getOverrideProps(overrides, "unitoption11")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || ingredient)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || ingredient) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
