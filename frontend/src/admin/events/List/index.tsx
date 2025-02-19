import {
  List,
  Datagrid,
  TextField,
  DateField,
  ChipField,
  SingleFieldList,
  ArrayField,
} from "react-admin";

export const EventList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" label="ID" />
        <TextField source="title.en" label="Title" />

        <ArrayField source="coins" label="Coins">
          <SingleFieldList linkType={false}>
            <ChipField source="fullname" size="small" />
          </SingleFieldList>
        </ArrayField>

        <ArrayField source="categories" label="Categories">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>

        <DateField source="date_event" label="Event Date" />
        <DateField source="created_at" label="Created At" />
        <DateField source="updated_at" label="Updated At" />
      </Datagrid>
    </List>
  );
};
