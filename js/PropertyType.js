$(document).ready(function () {
    executewithFillData({ 'OpCode': 1 }, 'SPR_PropertyType');
});
function InsertData() {
    if (ValidateTextBox($("#TxtPropertyType"), 'Property Type cannot not be empty')) {
        executewithFillData({ 'OpCode': 2, 'PropertyType': $("#TxtPropertyType").val(), 'PropertyTypeID': $("#hdnPrimaryFieldID").val(), }, 'SPR_PropertyType');
    }
}
function FillGrid(response) {
    if (response.d.includes('Error:')) {
        alert(response.d);
    } else {
        var xmlDoc = $.parseXML(response.d);
        var xml = $(xmlDoc);
        var table = xml.find("Table");
        var Tbl = $('#example3').DataTable();
        Tbl.clear();
        var count = 0;
        if (table.length > 0) {
            table.each(function () {
                count += 1;
                edithtml = "FillData(1,'PropertyTypeID'," + $(this).find("PropertyTypeID").text() + ",'SPR_PropertyType')";
                delhtml = "DeleteRow(3,'PropertyTypeID'," + $(this).find("PropertyTypeID").text() + ",'SPR_PropertyType')";
                Tbl.row.add([
                    count,
                    $(this).find("PropertyType").text(),
                    '<a href="#" id="btnEdit" onclick=' + edithtml + '><img src="ICON/edit.png" /></a>&ensp;|&ensp;' +
                    '<a href="#" id="btnDelete" onclick=' + delhtml + '><img src="ICON/delete.png"/></a>'
                ]);
                Tbl.draw(false);
            });
        } else {
            Tbl.draw(false);
        }
        SetModelDisplay("largemodal", 'hide');
        cleartextbox();
    }
}
function FillEditeGrid(response) {
    SetModelDisplay("largemodal", 'show')
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    var TableData = xml.find("Table");
    TableData.each(function () {
        var TableRow = $(this);
        $("#hdnPrimaryFieldID").val(TableRow.find("PropertyTypeID").text());
        $("#TxtPropertyType").val(TableRow.find("PropertyType").text());
    })
}