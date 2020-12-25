import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Cell from "./Cell";
import rat from "./rat.png";
import cheese from "./cheese.png";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Maze() {
  const classes = useStyles();
  let rows = 4;
  let columns = 4;
  let matrix = Array(rows)
    .fill()
    .map(() => Array(columns).fill(0));
  matrix[2][0] = 1;
  matrix[2][1] = 1;
  matrix[2][2] = 1;
  matrix[1][0] = 1;
  matrix[1][1] = 1;
  matrix[1][2] = 1;
  matrix[2][3] = 1;

  let paths = calculatePaths(matrix, 0, 0, rows, columns);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Box p={8}>
          <Grid
            style={{ backgroundColor: "orange" }}
            container
            justify="center"
          >
            <Grid
              key="0"
              style={{ backgroundColor: "black" }}
              container
              direction="row"
              spacing={0}
              item
              sm={3}
            >
              {loadCells(matrix, rows, columns, 0, [])}
            </Grid>
          </Grid>
          <Grid
            style={{ backgroundColor: "orange" }}
            container
            justify="center"
          >
            <Typography gutterBottom variant="subtitle1">
              Initial Maze
            </Typography>
          </Grid>
        </Box>
        <Grid style={{ backgroundColor: "orange" }} container justify="center">
          <Typography gutterBottom variant="subtitle1">
            Total Paths = {paths.length}
          </Typography>
        </Grid>
        {paths.map((path, index) => {
          return (
            <Grid
              key={(index + 1).toString()}
              style={{ backgroundColor: "black" }}
              container
              direction="row"
              spacing={0}
              item
              sm={3}
            >
              {loadCells(matrix, rows, columns, index + 1, path)}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

function calculatePaths(matrix, i, j, rows, columns) {
  let pathCount = 0;
  let paths = [];

  let visited = Array(rows)
    .fill()
    .map(() => Array(columns).fill(0));
  calculatePathsUtil(matrix, visited, i, j, rows, columns, []);
  //   console.log("pathCount", pathCount);
  return paths;
  function calculatePathsUtil(
    matrix,
    visited,
    i,
    j,
    rows,
    columns,
    currentpath
  ) {
    // console.log("i", i, "j", j);
    if (i < 0 || i >= rows || j < 0 || j >= columns) return;
    if (matrix[i][j] === 1 || visited[i][j] === 1) return;
    if (i === rows - 1 && j === columns - 1) {
      pathCount++;
      //   console.log("found a path");
      paths.push([...currentpath]);
      visited[i][j] = 0;
      return;
    }
    visited[i][j] = 1;
    //up
    currentpath.push([i - 1, j]);
    calculatePathsUtil(matrix, visited, i - 1, j, rows, columns, currentpath);
    currentpath.pop();

    //down
    currentpath.push([i + 1, j]);
    calculatePathsUtil(matrix, visited, i + 1, j, rows, columns, currentpath);
    currentpath.pop();
    //right
    currentpath.push([i, j + 1]);
    calculatePathsUtil(matrix, visited, i, j + 1, rows, columns, currentpath);
    currentpath.pop();
    //left
    currentpath.push([i, j - 1]);
    calculatePathsUtil(matrix, visited, i, j - 1, rows, columns, currentpath);
    currentpath.pop();

    visited[i][j] = 0;

    return;
  }
}

function loadCells(mat, rows, columns, gindex, path) {
  //   console.log(path);
  let matrix = Array(rows)
    .fill()
    .map(() => Array(columns).fill(0));
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      matrix[i][j] = mat[i][j];
    }
  }
  path.forEach((cordinate) => {
    // console.log(cordinate[0], cordinate[1]);
    matrix[cordinate[0]][cordinate[1]] = 2;
  });

  //   console.log(matrix);

  let cells = [];
  matrix.forEach((rowEle, rindex) => {
    rowEle.forEach((cval, cindex) => {
      if (cval === 1) {
        cells.push(
          <Cell
            key={gindex.toString() + rindex.toString() + cindex.toString()}
            color="red"
          >
            <Box height="50px"></Box>
          </Cell>
        );
      } else {
        if (rindex === 0 && cindex === 0) {
          cells.push(
            <Cell
              key={gindex.toString() + rindex.toString() + cindex.toString()}
              color="white"
            >
              <Box height="50px">
                <img style={{ width: "100%" }} alt="complex" src={rat} />
              </Box>{" "}
            </Cell>
          );
        } else if (rindex === rows - 1 && cindex === columns - 1) {
          cells.push(
            <Cell
              key={gindex.toString() + rindex.toString() + cindex.toString()}
              color="white"
            >
              <Box height="50px">
                <img style={{ width: "100%" }} alt="complex" src={cheese} />
              </Box>
            </Cell>
          );
        } else if (matrix[rindex][cindex] === 2) {
          cells.push(
            <Cell
              key={gindex.toString() + rindex.toString() + cindex.toString()}
              color="green"
            >
              <Box height="50px" />
            </Cell>
          );
        } else {
          cells.push(
            <Cell
              key={gindex.toString() + rindex.toString() + cindex.toString()}
              color="white"
            >
              <Box height="50px" />
            </Cell>
          );
        }
      }
    });
  });

  return cells;
}

export default Maze;
