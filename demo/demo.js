import { Grid, ThemeProvider, StyledEngineProvider, Button, adaptV4Theme, } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "../src";

let direction = "ltr";
const theme = createTheme(
  adaptV4Theme({
    direction: direction,
    palette: {
      mode: "light",
    },
    fontStyle: ""
  })
);
const bigData = [];
for (let i = 0; i < 1; i++) {
  const d = {
    id: i + 1,
    name: "Name" + i,
    surname: "Surname" + Math.round(i / 10),
    isMarried: i % 2 ? true : false,
    sex: i % 2 ? "Male" : "Female",
  };
  bigData.push(d);
}

class App extends Component {
  tableRef = React.createRef();
  colRenderCount = 0;
  state = {
    text: "text",
    selecteds: 0,
    data: [
      {
        id: 1,
        name: "Nasir",
        surname: "nkl",
        isMarried: false,
        sex: "Male",
        birthCity: "Norway"
      },
      {
        id: 2,
        name: "Amresh",
        surname: "abc",
        isMarried: false,
        sex: "Male",
        birthCity: "America",
      },
      {
        id: 3,
        name: "Jalaj",
        surname: "jkl",
        isMarried: false,
        sex: "Male",
        birthCity: "Japan",
      },
      {
        id: 4,
        name: "Fatima",
        surname: "fhkj",
        isMarried: false,
        sex: "Female",
        birthCity: "Faridabad",
      },
      {
        id: 5,
        name: "Bharat",
        surname: "bhhf",
        isMarried: false,
        sex: "Male",
        birthCity: "Bombay",
      }
    ],
    columns: [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Surname",
        field: "surname",
      },
      { 
        title: "IsMarried", 
        field: "isMarried" 
      },
      {
        title: "Category",
        field: "sex",
      },
      {
        title: "BirthCity",
        field: "birthCity",
      },
    ],
  };

  render() {
    return (
      <>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <div style={{ paddingLeft: 25, paddingTop: 25, paddingRight: 25 }}>
              <Grid container>
                <Grid item xs={12}>
                  <MaterialTable
                    tableRef={this.tableRef}
                    columns={this.state.columns}
                    data={this.state.data}
                    title= 'IFAS Grid'
                    onFilterChange={(appliedFilter) => {
                      console.log("selected Filters : ", appliedFilter);
                    }}
                    style= {{fontSize: '20px'}}
                    options={{
                      rowStyle: {
                        fontFamily: ('Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'),
                        fontSize: "14px"
                      },

                      headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF',
                        fontweight: "bold",
                      },

                      exportButton: true,

                      selection: true, 

                      ToogleMenuButton: true,

                      PinRight: true,

                      PinLeft: true,

                      Unpin: true,

                      Filter: true,

                      SortAesc: true,

                      SortDesc: true,
          
                    }}

                    editable = {{
                      onRowAdd: (newData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                              const data = this.state.data;
                              data.push(newData);
                              this.setState({ data }, () => resolve());
                            }
                            resolve();
                          }, 1000);
                        }),

                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                              const data = this.state.data;
                              const index = data.indexOf(oldData);
                              data[index] = newData;
                              this.setState({ data }, () => resolve()); 
                            }
                            resolve();
                          }, 1000);
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                              let data = this.state.data;
                              const index = data.indexOf(oldData);
                              data.splice(index, 1);
                              this.setState({ data }, () => resolve());
                            }
                            resolve();
                          }, 1000);
                        }),
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </ThemeProvider>
        </StyledEngineProvider>
      </>
    );
  }
}
  
ReactDOM.render(<App />, document.getElementById("app"));

module.hot.accept();
