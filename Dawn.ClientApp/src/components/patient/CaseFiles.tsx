import * as React from "react";
import { List } from "antd";
import { ICaseFileVm } from "../../api/generated";
import { Link } from "react-router-dom";
import style from "./caseFiles.scss";

interface Props {
  files: ICaseFileVm[];
}

const CaseFiles = ({ files }: Props) => (
  <div className={style.list}>
    <div className={style.header}>
      <h3>Case Files</h3>
    </div>
    {files && (
      <List bordered>
        {files.map((file) => (
          <Link to={`/casefiles/${file.id}`} key={file.id}>
            <List.Item>{file.name}</List.Item>
          </Link>
        ))}
      </List>
    )}
  </div>
);

export default CaseFiles;
