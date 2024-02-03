import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";
import MainContext from "../../app/context/context";

const QuestionFolders = (props) => {
  const global = useContext(MainContext);
  return (
    <>
      <div style={{ cursor: "pointer", }} className="col-md-4 my-2">
        <Card style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {props?.folder?.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Link  href={"./groups/" + props?.folder?._id} className="card text-center shadow-soft border-light animate-up-3">
              <Button size="small">Open</Button>
            </Link>
          </CardActions>
        </Card>

      </div>
    </>
  );
};



export default QuestionFolders;
