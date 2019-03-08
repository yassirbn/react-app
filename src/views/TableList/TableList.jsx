import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import axios from "axios";
import { thead, tbody } from "variables/general";

class RegularTables extends React.Component {
  constructor(prop,contexte){
    super(prop,contexte);
    this.state={
      users:[]
    }

    this.getAll();
  }
  getAll() {

    axios.get("http://localhost:3002/users/all").then(item => {


      console.log(item.data.data);

      this.setState({users: item.data.data})
    })

  }


  render() {
    return (
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4"></CardTitle>
                <p className="card-category">Users</p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {thead.map((prop, key) => {
                        if (key === thead.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                  {

                    this.state.users.map(prop =>

                        <tr>
                          <td className="text-right">
                            {prop.firstName}
                          </td>

                          <td className="text-right">
                            {prop.lastName}
                          </td>

                          <td className="text-right">
                            {prop.email}
                          </td>
                          <td className="text-right">
                            {prop.societe}
                          </td>
                        </tr>
                    )

                  }

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RegularTables;
