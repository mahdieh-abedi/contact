import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Avatar, Checkbox} from "@mui/material";
import stringAvatar from "@mui/styled-engine-sc";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ClearIcon from "@mui/icons-material/Clear";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { PersonContext,NewPersonContext } from "../..";

const SortList = ({ sortDataByFirstName }) => {
  const { dispatch } = useContext(PersonContext);
  const {setNewPerson } = useContext(NewPersonContext);
  const handleDelete = (ID) => {
    dispatch({ type: "Delete", payload: { ID } });
  };
  const handleFavorite = (ID, e) => {
    e.preventDefault();
    dispatch({ type: "Favorite", payload: { ID, checked: e.target.checked } });
  };
  return (
    <>
      {sortDataByFirstName.map((item) => (
        <Row key={item.id} className="mt-3">
          <Col>
            <Checkbox
              onChange={(e) => handleFavorite(item.id, e)}
              checked={item.favorite}
              icon={<StarBorderIcon style={{ color: "#E6E6E6" }} />}
              checkedIcon={<StarIcon style={{ color: "#F0D879" }} />}
            />
          </Col>
          <Col xs={2}>
            <Link to={`/profile/${item.id}`}>
              <Avatar {...stringAvatar("Kent Dodds")} src={item.image} />
            </Link>
          </Col>
          <Col xs={4}>
            <Link to={`/profile/${item.id}`}>
              <h6>{item.firstName}</h6>
            </Link>
          </Col>
          <Col>
            <ClearIcon
              style={{ color: "#E7475E" }}
              onClick={() => handleDelete(item.id)}
            />
          </Col>
          <Col>
            <Link to={`/edit/${item.id}`} >
              <ModeEditIcon
                style={{ color: "#E6E6E6" }}
                onClick={() => {
                  setNewPerson(item);
                }}
              />
            </Link>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default SortList;