/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createDish } from "../graphql/mutations";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function DishCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    types: [],
    servings: "",
    size: "",
    description: "",
    instructions: "",
    tags: [],
    sideDishes: [],
    sideDishTo: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [types, setTypes] = React.useState(initialValues.types);
  const [servings, setServings] = React.useState(initialValues.servings);
  const [size, setSize] = React.useState(initialValues.size);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [instructions, setInstructions] = React.useState(
    initialValues.instructions
  );
  const [tags, setTags] = React.useState(initialValues.tags);
  const [sideDishes, setSideDishes] = React.useState(initialValues.sideDishes);
  const [sideDishTo, setSideDishTo] = React.useState(initialValues.sideDishTo);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setTypes(initialValues.types);
    setCurrentTypesValue("");
    setServings(initialValues.servings);
    setSize(initialValues.size);
    setDescription(initialValues.description);
    setInstructions(initialValues.instructions);
    setTags(initialValues.tags);
    setCurrentTagsValue("");
    setSideDishes(initialValues.sideDishes);
    setCurrentSideDishesValue("");
    setSideDishTo(initialValues.sideDishTo);
    setCurrentSideDishToValue("");
    setErrors({});
  };
  const [currentTypesValue, setCurrentTypesValue] = React.useState("");
  const typesRef = React.createRef();
  const [currentTagsValue, setCurrentTagsValue] = React.useState("");
  const tagsRef = React.createRef();
  const [currentSideDishesValue, setCurrentSideDishesValue] =
    React.useState("");
  const sideDishesRef = React.createRef();
  const [currentSideDishToValue, setCurrentSideDishToValue] =
    React.useState("");
  const sideDishToRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    types: [{ type: "Required" }],
    servings: [],
    size: [],
    description: [],
    instructions: [],
    tags: [],
    sideDishes: [],
    sideDishTo: [],
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
          types,
          servings,
          size,
          description,
          instructions,
          tags,
          sideDishes,
          sideDishTo,
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createDish.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "DishCreateForm")}
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
              types,
              servings,
              size,
              description,
              instructions,
              tags,
              sideDishes,
              sideDishTo,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              types: values,
              servings,
              size,
              description,
              instructions,
              tags,
              sideDishes,
              sideDishTo,
            };
            const result = onChange(modelFields);
            values = result?.types ?? values;
          }
          setTypes(values);
          setCurrentTypesValue("");
        }}
        currentFieldValue={currentTypesValue}
        label={"Types"}
        items={types}
        hasError={errors?.types?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("types", currentTypesValue)
        }
        errorMessage={errors?.types?.errorMessage}
        setFieldValue={setCurrentTypesValue}
        inputFieldRef={typesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Types"
          isRequired={true}
          isReadOnly={false}
          value={currentTypesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.types?.hasError) {
              runValidationTasks("types", value);
            }
            setCurrentTypesValue(value);
          }}
          onBlur={() => runValidationTasks("types", currentTypesValue)}
          errorMessage={errors.types?.errorMessage}
          hasError={errors.types?.hasError}
          ref={typesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "types")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Servings"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={servings}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              types,
              servings: value,
              size,
              description,
              instructions,
              tags,
              sideDishes,
              sideDishTo,
            };
            const result = onChange(modelFields);
            value = result?.servings ?? value;
          }
          if (errors.servings?.hasError) {
            runValidationTasks("servings", value);
          }
          setServings(value);
        }}
        onBlur={() => runValidationTasks("servings", servings)}
        errorMessage={errors.servings?.errorMessage}
        hasError={errors.servings?.hasError}
        {...getOverrideProps(overrides, "servings")}
      ></TextField>
      <TextField
        label="Size"
        isRequired={false}
        isReadOnly={false}
        value={size}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              types,
              servings,
              size: value,
              description,
              instructions,
              tags,
              sideDishes,
              sideDishTo,
            };
            const result = onChange(modelFields);
            value = result?.size ?? value;
          }
          if (errors.size?.hasError) {
            runValidationTasks("size", value);
          }
          setSize(value);
        }}
        onBlur={() => runValidationTasks("size", size)}
        errorMessage={errors.size?.errorMessage}
        hasError={errors.size?.hasError}
        {...getOverrideProps(overrides, "size")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              types,
              servings,
              size,
              description: value,
              instructions,
              tags,
              sideDishes,
              sideDishTo,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Instructions"
        isRequired={false}
        isReadOnly={false}
        value={instructions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              types,
              servings,
              size,
              description,
              instructions: value,
              tags,
              sideDishes,
              sideDishTo,
            };
            const result = onChange(modelFields);
            value = result?.instructions ?? value;
          }
          if (errors.instructions?.hasError) {
            runValidationTasks("instructions", value);
          }
          setInstructions(value);
        }}
        onBlur={() => runValidationTasks("instructions", instructions)}
        errorMessage={errors.instructions?.errorMessage}
        hasError={errors.instructions?.hasError}
        {...getOverrideProps(overrides, "instructions")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              types,
              servings,
              size,
              description,
              instructions,
              tags: values,
              sideDishes,
              sideDishTo,
            };
            const result = onChange(modelFields);
            values = result?.tags ?? values;
          }
          setTags(values);
          setCurrentTagsValue("");
        }}
        currentFieldValue={currentTagsValue}
        label={"Tags"}
        items={tags}
        hasError={errors?.tags?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("tags", currentTagsValue)
        }
        errorMessage={errors?.tags?.errorMessage}
        setFieldValue={setCurrentTagsValue}
        inputFieldRef={tagsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Tags"
          isRequired={false}
          isReadOnly={false}
          value={currentTagsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tags?.hasError) {
              runValidationTasks("tags", value);
            }
            setCurrentTagsValue(value);
          }}
          onBlur={() => runValidationTasks("tags", currentTagsValue)}
          errorMessage={errors.tags?.errorMessage}
          hasError={errors.tags?.hasError}
          ref={tagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "tags")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              types,
              servings,
              size,
              description,
              instructions,
              tags,
              sideDishes: values,
              sideDishTo,
            };
            const result = onChange(modelFields);
            values = result?.sideDishes ?? values;
          }
          setSideDishes(values);
          setCurrentSideDishesValue("");
        }}
        currentFieldValue={currentSideDishesValue}
        label={"Side dishes"}
        items={sideDishes}
        hasError={errors?.sideDishes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("sideDishes", currentSideDishesValue)
        }
        errorMessage={errors?.sideDishes?.errorMessage}
        setFieldValue={setCurrentSideDishesValue}
        inputFieldRef={sideDishesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Side dishes"
          isRequired={false}
          isReadOnly={false}
          value={currentSideDishesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.sideDishes?.hasError) {
              runValidationTasks("sideDishes", value);
            }
            setCurrentSideDishesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("sideDishes", currentSideDishesValue)
          }
          errorMessage={errors.sideDishes?.errorMessage}
          hasError={errors.sideDishes?.hasError}
          ref={sideDishesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sideDishes")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              types,
              servings,
              size,
              description,
              instructions,
              tags,
              sideDishes,
              sideDishTo: values,
            };
            const result = onChange(modelFields);
            values = result?.sideDishTo ?? values;
          }
          setSideDishTo(values);
          setCurrentSideDishToValue("");
        }}
        currentFieldValue={currentSideDishToValue}
        label={"Side dish to"}
        items={sideDishTo}
        hasError={errors?.sideDishTo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("sideDishTo", currentSideDishToValue)
        }
        errorMessage={errors?.sideDishTo?.errorMessage}
        setFieldValue={setCurrentSideDishToValue}
        inputFieldRef={sideDishToRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Side dish to"
          isRequired={false}
          isReadOnly={false}
          value={currentSideDishToValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.sideDishTo?.hasError) {
              runValidationTasks("sideDishTo", value);
            }
            setCurrentSideDishToValue(value);
          }}
          onBlur={() =>
            runValidationTasks("sideDishTo", currentSideDishToValue)
          }
          errorMessage={errors.sideDishTo?.errorMessage}
          hasError={errors.sideDishTo?.hasError}
          ref={sideDishToRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sideDishTo")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
