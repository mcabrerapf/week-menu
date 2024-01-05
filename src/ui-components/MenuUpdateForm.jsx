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
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getMenu } from "../graphql/queries";
import { updateMenu } from "../graphql/mutations";
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
export default function MenuUpdateForm(props) {
  const {
    id: idProp,
    menu: menuModelProp,
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
    favourite: false,
    description: "",
    tags: [],
    dessert: [],
    snacks: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [favourite, setFavourite] = React.useState(initialValues.favourite);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [tags, setTags] = React.useState(initialValues.tags);
  const [dessert, setDessert] = React.useState(initialValues.dessert);
  const [snacks, setSnacks] = React.useState(initialValues.snacks);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = menuRecord
      ? { ...initialValues, ...menuRecord }
      : initialValues;
    setName(cleanValues.name);
    setFavourite(cleanValues.favourite);
    setDescription(cleanValues.description);
    setTags(cleanValues.tags ?? []);
    setCurrentTagsValue("");
    setDessert(cleanValues.dessert ?? []);
    setCurrentDessertValue("");
    setSnacks(cleanValues.snacks ?? []);
    setCurrentSnacksValue("");
    setErrors({});
  };
  const [menuRecord, setMenuRecord] = React.useState(menuModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getMenu.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMenu
        : menuModelProp;
      setMenuRecord(record);
    };
    queryData();
  }, [idProp, menuModelProp]);
  React.useEffect(resetStateValues, [menuRecord]);
  const [currentTagsValue, setCurrentTagsValue] = React.useState("");
  const tagsRef = React.createRef();
  const [currentDessertValue, setCurrentDessertValue] = React.useState("");
  const dessertRef = React.createRef();
  const [currentSnacksValue, setCurrentSnacksValue] = React.useState("");
  const snacksRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    favourite: [],
    description: [],
    tags: [],
    dessert: [],
    snacks: [],
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
          favourite: favourite ?? null,
          description: description ?? null,
          tags: tags ?? null,
          dessert: dessert ?? null,
          snacks: snacks ?? null,
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
            query: updateMenu.replaceAll("__typename", ""),
            variables: {
              input: {
                id: menuRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MenuUpdateForm")}
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
              favourite,
              description,
              tags,
              dessert,
              snacks,
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
      <SwitchField
        label="Favourite"
        defaultChecked={false}
        isDisabled={false}
        isChecked={favourite}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              favourite: value,
              description,
              tags,
              dessert,
              snacks,
            };
            const result = onChange(modelFields);
            value = result?.favourite ?? value;
          }
          if (errors.favourite?.hasError) {
            runValidationTasks("favourite", value);
          }
          setFavourite(value);
        }}
        onBlur={() => runValidationTasks("favourite", favourite)}
        errorMessage={errors.favourite?.errorMessage}
        hasError={errors.favourite?.hasError}
        {...getOverrideProps(overrides, "favourite")}
      ></SwitchField>
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
              favourite,
              description: value,
              tags,
              dessert,
              snacks,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              favourite,
              description,
              tags: values,
              dessert,
              snacks,
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
              favourite,
              description,
              tags,
              dessert: values,
              snacks,
            };
            const result = onChange(modelFields);
            values = result?.dessert ?? values;
          }
          setDessert(values);
          setCurrentDessertValue("");
        }}
        currentFieldValue={currentDessertValue}
        label={"Dessert"}
        items={dessert}
        hasError={errors?.dessert?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("dessert", currentDessertValue)
        }
        errorMessage={errors?.dessert?.errorMessage}
        setFieldValue={setCurrentDessertValue}
        inputFieldRef={dessertRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Dessert"
          isRequired={false}
          isReadOnly={false}
          value={currentDessertValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.dessert?.hasError) {
              runValidationTasks("dessert", value);
            }
            setCurrentDessertValue(value);
          }}
          onBlur={() => runValidationTasks("dessert", currentDessertValue)}
          errorMessage={errors.dessert?.errorMessage}
          hasError={errors.dessert?.hasError}
          ref={dessertRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "dessert")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              favourite,
              description,
              tags,
              dessert,
              snacks: values,
            };
            const result = onChange(modelFields);
            values = result?.snacks ?? values;
          }
          setSnacks(values);
          setCurrentSnacksValue("");
        }}
        currentFieldValue={currentSnacksValue}
        label={"Snacks"}
        items={snacks}
        hasError={errors?.snacks?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("snacks", currentSnacksValue)
        }
        errorMessage={errors?.snacks?.errorMessage}
        setFieldValue={setCurrentSnacksValue}
        inputFieldRef={snacksRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Snacks"
          isRequired={false}
          isReadOnly={false}
          value={currentSnacksValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.snacks?.hasError) {
              runValidationTasks("snacks", value);
            }
            setCurrentSnacksValue(value);
          }}
          onBlur={() => runValidationTasks("snacks", currentSnacksValue)}
          errorMessage={errors.snacks?.errorMessage}
          hasError={errors.snacks?.hasError}
          ref={snacksRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "snacks")}
        ></TextField>
      </ArrayField>
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
          isDisabled={!(idProp || menuModelProp)}
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
              !(idProp || menuModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
