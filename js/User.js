$(document).ready(function () {
    FillDropDown({ 'OpCode': 1 }, 'cboRole', 'cboTehsil', 'cboDistrict', null, null, null, 0, 'SPR_dropdowns');
    FillDropDown({ 'OpCode': 1 }, 'CboRoleSearch', 'CboTehsilSearch', 'CboDistrictSearch', null, null, null, 1, 'SPR_dropdowns');
    loadTehsil(1);
    executewithFillData({ 'OpCode': 1 }, 'SPR_User');
});
function loadTehsil(temp) {
    FillDropDown({ 'OpCode': 1, 'FK_DisttID': temp }, null, 'cboTehsil', null, null, null, null, 0, 'SPR_dropdowns');
}
function loadTehsilS(temp) {
    FillDropDown({ 'OpCode': 1, 'FK_DisttID': temp }, null, 'CboTehsilSearch', null, null, null, null, 1, 'SPR_dropdowns');
}
function SearchData() {
    executewithFillData({'OpCode': 6,'FK_DisttID': $('#CboDistrictSearch option:selected').val(),'FK_TehsilID': $('#CboTehsilSearch option:selected').val(),
        'FK_RoleID': $('#CboRoleSearch option:selected').val() }, 'SPR_User');
}
function InsertData() {
    if (ValidateTextBox($("#cboRole"), 'Role cannot not be empty')
        && ValidateTextBox($("#TxtUserName"), 'UserName cannot not be empty')
        && ValidateTextBox($("#TxtPassword"), 'Password cannot not be empty')
        && ValidateTextBox($("#TxtFullName"), 'Full Name cannot not be empty')
        && ValidateTextBox($("#TxtAddress"), 'Address cannot not be empty')
        && ValidateTextBox($("#cboDistrict"), 'District cannot not be empty')
        && ValidateTextBox($("#cboTehsil"), 'Tehsil cannot not be empty')
        && ValidateTextBox($("#TxtCellNo"), 'Cell No cannot not be empty')) {
        executewithFillData(
            {
                'OpCode': 2,
                'FK_RoleID': $("#cboRole").val(),
                'UserName': $("#TxtUserName").val(),
                'UserPassword': $("#TxtPassword").val(),
                'FullName': $("#TxtFullName").val(),
                'StatusID': $("#cboStatus").val(),
                'UserID': $("#hdnPrimaryFieldID").val(),
                'UserAddress': $("#TxtAddress").val(),
                'FK_DisttID': $("#cboDistrict").val(),
                'FK_TehsilID': $("#cboTehsil").val(),
                'CellNo': $("#TxtCellNo").val(),
                'UserMail': $("#TxtMail").val(),
            }
            , 'SPR_User');
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
                edithtml = "FillData(1,'UserID'," + $(this).find("UserID").text() + ",'SPR_User')";
                delhtml = "DeleteRow(3,'UserID'," + $(this).find("UserID").text() + ",'SPR_User')";
                Tbl.row.add([
                    count,
                    $(this).find("UserName").text(),
                    $(this).find("UserPassword").text(),
                    $(this).find("FullName").text(),
                    $(this).find("Roles").text(),
                    $(this).find("Area").text(),
                    $(this).find("ContactInfo").text(),
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
        $("#hdnPrimaryFieldID").val($(this).find("UserID").text());
        $("#TxtUserName").val($(this).find("UserName").text());
        $("#TxtPassword").val($(this).find("UserPassword").text());
        $("#TxtFullName").val($(this).find("FullName").text());
        $("#cboRole").val($(this).find("FK_RoleID").text());
        $("#cboDistrict").val($(this).find("FK_DisttID").text());
        loadTehsil($(this).find("FK_DisttID").text());
        $("#cboTehsil").val($(this).find("FK_TehsilID").text());
        $("#TxtAddress").val($(this).find("UserAddress").text());
        $("#TxtCellNo").val($(this).find("CellNo").text());
        $("#TxtMail").val($(this).find("UserMail").text());
        if ($(this).find("StatusID").text() == 'true') {
            $("#cboStatus").val("1");
        } else {
            $("#cboStatus").val("0");
        };
    })
}