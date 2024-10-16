import { Link } from "react-router-dom";

import { EditNoteRounded } from "@mui/icons-material";

import { IconButton } from "@mui/material";

type EditProps = {
  link: string;
};

const Edit = ({ link }: EditProps) => {
  return (
    <Link to={`${link}/update`}>
      <IconButton aria-label="edit">
        <EditNoteRounded color="secondary" />
      </IconButton>
    </Link>
  );
};

export default Edit;
