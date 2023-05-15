$(document).ready(function () {
    FillDropDown({ 'OpCode': 1 }, null, null, 'cboDistrict', null, null, null, 0, 'SPR_dropdowns');
    FillDropDown({ 'OpCode': 1 }, null, null, 'CboDistrictSearch', null, null, null, 1, 'SPR_dropdowns');
    executewithFillData({ 'OpCode': 1 }, 'SPR_Tehsil');
});

function SearchData() {
    executewithFillData({
        'OpCode': 6, 'FK_DisttID': $('#CboDistrictSearch option:selected').val()
    }, 'SPR_Tehsil');
}
function InsertData() {
    if (ValidateTextBox($("#TxtTehsil"), 'Tehsil cannot not be empty')) {
        executewithFillData(
            {
                'OpCode': 2,
                'Tehsil': $("#TxtTehsil").val(),
                'FK_DisttID': $("#cboDistrict").val(),
                'TehsilID': $("#hdnPrimaryFieldID").val(),
            }
            , 'SPR_Tehsil');
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
                edithtml = "FillData(1,'TehsilID'," + $(this).find("TehsilID").text() + ",'SPR_Tehsil')";
                delhtml = "DeleteRow(3,'TehsilID'," + $(this).find("TehsilID").text() + ",'SPR_Tehsil')";
                Tbl.row.add([
                    count,
                    $(this).find("District").text(),
                    $(this).find("Tehsil").text(),
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
        $("#hdnPrimaryFieldID").val(TableRow.find("TehsilID").text());
        $("#TxtTehsil").val(TableRow.find("Tehsil").text());
        $("#cboDistrict").val(TableRow.find("FK_DisttID").text());
    })
}