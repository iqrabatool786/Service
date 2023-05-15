$(document).ready(function () {
    executewithFillData({ 'OpCode': 1 }, 'SPR_Distt');
});
function InsertData() {
    if (ValidateTextBox($("#TxtDistrict"), 'District cannot not be empty')) {
        executewithFillData(
            {
                'OpCode': 2,
                'District': $("#TxtDistrict").val(),
                'DisttID': $("#hdnPrimaryFieldID").val(),
            }
            , 'SPR_Distt');
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
                edithtml = "FillData(1,'DisttID'," + $(this).find("DisttID").text() + ",'SPR_Distt')";
                delhtml = "DeleteRow(3,'DisttID'," + $(this).find("DisttID").text() + ",'SPR_Distt')";
                Tbl.row.add([
                    count,
                    $(this).find("District").text(),
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
        $("#hdnPrimaryFieldID").val(TableRow.find("DisttID").text());
        $("#TxtDistrict").val(TableRow.find("District").text());
    })
}