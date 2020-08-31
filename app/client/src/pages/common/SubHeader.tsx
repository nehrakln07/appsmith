import React, { ReactNode } from "react";
import FormDialogComponent from "components/editorComponents/form/FormDialogComponent";
import { ControlGroup, InputGroup, IIconProps } from "@blueprintjs/core";
// import Button from "components/editorComponents/Button";
import styled from "styled-components";
import _, { noop } from "lodash";
import SearchInput, { SearchVariant } from "components/ads/SearchInput";
import Button, { Size } from "components/ads/Button";

const SubHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  padding-top: 30px;
  background: ${props => props.theme.homePage.background};
  top: ${props => props.theme.homePage.header}px;
  left: 369px;
  z-index: 10;
`;
const StyledAddButton = styled(Button)<IIconProps>`
  &&& {
    outline: none;
  }
`;
const SearchContainer = styled.div`
  flex-grow: 1;
  .bp3-control-group {
    display: block;
  }
  && {
    .bp3-input {
      width: 40%;
    }
  }
`;

type SubHeaderProps = {
  add?: {
    form: ReactNode;
    title: string;
    formName: string;
    isAdding: boolean;
    formSubmitIntent: string;
    errorAdding?: string;
    formSubmitText: string;
    onClick: () => void;
  };
  search?: {
    placeholder: string;
    debounce?: boolean;
    queryFn?: (keyword: string) => void;
  };
};

export const ApplicationsSubHeader = (props: SubHeaderProps) => {
  const query =
    props.search &&
    props.search.queryFn &&
    _.debounce(props.search.queryFn, 250, { maxWait: 1000 });
  const searchQuery = (e: any) => {
    query && query(e.target.value);
  };

  const createTrigger = props.add && (
    <Button
      text={props.add.title}
      size={Size.medium}
      // icon={"plus"}
    />
    // <StyledAddButton
    //   text={props.add.title}
    //   icon="plus"
    //   title={props.add.title}
    //   onClick={props.add.onClick}
    //   filled
    //   intent="primary"
    // />
  );

  return (
    <SubHeaderWrapper>
      <SearchContainer>
        {props.search && (
          <ControlGroup>
            <SearchInput
              cypressSelector={"t--application-search-input"}
              placeholder={props.search.placeholder}
              variant={SearchVariant.SEAMLESS}
              onChange={query || noop}
            />
          </ControlGroup>
        )}
      </SearchContainer>

      {props.add && (
        <FormDialogComponent
          trigger={createTrigger}
          Form={props.add.form}
          title={props.add.title}
        />
      )}
    </SubHeaderWrapper>
  );
};

export default ApplicationsSubHeader;
