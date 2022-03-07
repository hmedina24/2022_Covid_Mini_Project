import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { DeleteButton } from '../components/buttons';
import api from '../api';

import MaUTable from '@material-ui/core/Table';
import { CssBaseline, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;

  @media screen and (max-width: 420px) {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
`;

const Table = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow data-row-patient-id={row.values._id} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: {},
    };
  }

  componentDidMount() {
    console.log('PatientsList: props');
    console.log(this.props);

    this.fetchAllPatients();
  }

  fetchAllPatients = () => {
    api
      .getAllPatients()
      .then(resp => {
        const { patients } = resp.data;
        console.log('getAllPatients: resp');
        console.log(patients);
        this.setState({ patients });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllPatients': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSingleItem = patientId => {
    return api
      .deleteItemById(patientId)
      .then(resp => {
        console.log('deleteItemById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'deleteSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleRemoveItem = data => {
    const patientId = data;

    this.deleteSingleItem(patientId).then(resp => {
      console.log('handleRemoveItem: resp');
      console.log(resp);
      this.fetchAllPatients();
    });
  };

  render() {
    const patients = this.state.patients || {};
    console.log(patients);

    const columns = [
      {
        Header: 'PATIENT_ID',
        accessor: 'PATIENT_ID',
        filterable: true,
        Cell: props => {
          console.log(props);
          const { original } = props.cell.row;
          return <span data-patient-id={original.PATIENT_ID}>{props.value}</span>;
        },
      },
      {
        Header: 'AGE',
        accessor: 'AGE',
        filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-name={original.age}>{props.value}</span>;
        },
      },
      {
      Header: 'SEX',
      accessor: 'SEX',
      // filterable: true,
      Cell: props => {
          const { original } = props.cell.row;
          return <span data-name={original.SEX}>{props.value}</span>;
        },
      },
      {
      Header: 'Timeframe',
      accessor: 'timeframeNote',
      Cell: props => {
          const { original } = props.cell.row;
          return <span data-timeframe={original.timeframeNote}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-priority={original.priority}>{props.value}</span>;
        },
      },
      {
        Header: 'Update',
        accessor: '_update',
        Cell: props => {
          const { original } = props.cell.row;

          return (
            <Link data-update-id={original._id} to={`/patient/update/${original._id}`}>
              Update
            </Link>
          );
        },
      },
      {
        Header: 'Delete',
        accessor: '_delete',
        Cell: props => {
          const { original } = props.cell.row;
          return (
            <span data-delete-id={original._id}>
              <DeleteButton id={original._id} onDelete={this.handleRemoveItem} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        <CssBaseline />
        {(patients || []).length > 0 ? (
          <Table data={patients} columns={columns} />
        ) : (
          `No patients to render... :(`
        )}
      </Wrapper>
    );
  }
}

export default Patients;
