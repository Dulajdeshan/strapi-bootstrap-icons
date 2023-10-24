import { useMemo, useRef, useState } from "react";
import { useIntl, MessageDescriptor } from "react-intl";
import {
  Box,
  Field,
  FieldAction,
  FieldError,
  FieldHint,
  FieldInput,
  FieldLabel,
  Stack,
  Flex,
  ModalLayout,
  ModalHeader,
  Typography,
  ModalBody,
  ModalFooter,
  Button,
  SearchForm,
  Searchbar,
  Tooltip,
  IconButton,
} from "@strapi/design-system";
import { Cross } from "@strapi/icons";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import iconList from "bootstrap-icons/font/bootstrap-icons.json";
import getTrad from "../../utils/getTrad";

interface IInputProps {
  attribute?: any;
  disabled?: string;
  error?: string;
  labelAction?: any;
  name: string;
  required?: boolean;
  value: string;
  description?: MessageDescriptor | null;
  intlLabel: MessageDescriptor | null;
  placeholder?: MessageDescriptor | null;
  onChange?: any;
}

const BootstrapFieldInput = styled(FieldInput)`
  &:hover {
    cursor: pointer;
  }
`;

export const FieldActionWrapper = styled(FieldAction)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;

const Input = ({
  attribute,
  description,
  placeholder,
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  required,
  value,
  onChange,
}: IInputProps) => {
  const { formatMessage } = useIntl();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIconList = useMemo(
    () =>
      Object.keys(iconList).filter((item) => {
        return item.includes(searchQuery.toLowerCase());
      }),
    [iconList, searchQuery]
  );

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleChange = (icon?: string) => {
    onChange({ target: { value: icon, name } });
  };

  const handleClickIcon = (icon?: string) => {
    handleChange(icon);
    toggleModal();
  };

  return (
    <Box>
      <Field
        id={name}
        name={name}
        hint={description && formatMessage(description)}
        error={error}
      >
        <Stack spacing={1}>
          <Flex>
            <FieldLabel>{intlLabel && formatMessage(intlLabel)}</FieldLabel>
          </Flex>
          <BootstrapFieldInput
            onChange={onChange}
            labelAction={labelAction}
            placeholder={placeholder}
            readOnly={true}
            onClick={toggleModal}
            required
            value={value}
            require={required}
            disabled={disabled}
            startAction={
              <FieldActionWrapper onClick={toggleModal}>
                <Typography className={`bi bi-${value}`}></Typography>
              </FieldActionWrapper>
            }
            endAction={
              <FieldActionWrapper onClick={() => handleChange("")}>
                <Cross />
              </FieldActionWrapper>
            }
          />
          <FieldHint />
          <FieldError />
        </Stack>
      </Field>
      {isModalVisible && (
        <ModalLayout onClose={toggleModal} labelledBy="title">
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              {formatMessage({
                id: getTrad("modal.title"),
                defaultMessage: "Select a icon",
              })}
            </Typography>
          </ModalHeader>
          <ModalBody style={{ minHeight: "400px" }}>
            <Flex gap={2} style={{ marginBottom: "20px" }}>
              <SearchForm>
                <Searchbar
                  name="searchbar"
                  onClear={() => setSearchQuery("")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={formatMessage({
                    id: getTrad("search.placeholder"),
                    defaultMessage: "Search icons",
                  })}
                />
              </SearchForm>
            </Flex>
            <Flex gap={2} wrap="wrap">
              {filteredIconList.map((item) => (
                <Tooltip description={item}>
                  <IconButton
                    aria-label="Edit"
                    style={{ width: "inherit", height: "inherit" }}
                    onClick={() => handleClickIcon(item)}
                  >
                    <Typography
                      className={`icon bi-${item}`}
                      style={{ fontSize: 24 }}
                    ></Typography>
                  </IconButton>
                </Tooltip>
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={toggleModal} variant="tertiary">
                {formatMessage({
                  id: getTrad("model.cancel"),
                  defaultMessage: "Cancel",
                })}
              </Button>
            }
          />
        </ModalLayout>
      )}
    </Box>
  );
};

export default Input;
