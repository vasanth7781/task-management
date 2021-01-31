import React from 'react';
import styled from 'styled-components';

interface Props {
  message: string;
  createdAt: string;
}
const TaskPanelBody: React.FC<Props> = (props: Props) => {
  return (
    <TaskPanelBodyWrapper className={'d-flex flex-column h-100'}>
      <div className={'align-self-start h-75'}>
        <h6>{props.message}</h6>
      </div>
      <div className={'align-self-start'}>
        <span>{props.createdAt}</span>
      </div>
    </TaskPanelBodyWrapper>
  );
};
const TaskPanelBodyWrapper = styled.div``;

export default TaskPanelBody;
