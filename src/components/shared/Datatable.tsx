import DataTable from "react-data-table-component";

type Props = {
  incomingData: any;
  columns: any;
  loading: any;
};

function Datatable({
  incomingData,
  columns,
  loading,
}: Props) {
  return (
    <div style={{ marginTop: "35px" }}>
      <DataTable
        title=""
        columns={columns}
        data={incomingData}
        pagination
        progressPending={loading}
      />
    </div>
  );
}

export default Datatable;
