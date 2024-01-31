export class TableColumn {
    /**
     * label for column name
     */
    label: string;
    /**
     * data type for data
     */
    type: 'number' | 'date' | 'text';
    /**
     * property name to access the data
     */
    propName: string
}