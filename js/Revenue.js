$(document).ready(function () {
    $(".Masking").mask("99/99/9999");
    $(".MaskingA").mask("99999-9999999-9");
    GetDate('TransferDate');
    calTAmount();
    FillDropDown({ 'OpCode': 1 }, null, 'cboTehsil', 'cboDistrict', null, 'txtPType', null, 0, 'SPR_dropdowns');
    FillDropDown({ 'OpCode': 1 }, null, 'CboTehsilSearch', 'CboDistrictSearch', null, 'cboPTypeSearch', null, 1, 'SPR_dropdowns');
    loadTehsil($("#cboDistrict").val());
    executewithFillData({ 'OpCode': 1 }, 'SPR_Revenue');
    
    
});

function cnicMasking() {
    if ($('#cboFTDDSearch').val() == 'tbl_Revenue.FCNIC' || $('#cboFTDDSearch').val() == 'tbl_Revenue.TCNIC') {
        $('#CboFTSearch').addClass('MaskingA');
        $(".MaskingA").mask("99999-9999999-9");
    } else {
        $('#CboFTSearch').removeClass('MaskingA');
        $("#CboFTSearch").unmask();
    }
}
function loadTehsil(temp,selval) {
    FillDropDownwithSelect({ 'OpCode': 1, 'FK_DisttID': temp }, null, 'cboTehsil', null, null, null, null, 0, 'SPR_dropdowns', selval);
}
function loadTehsilS(temp) {
    FillDropDown({ 'OpCode': 1, 'FK_DisttID': temp }, null, 'CboTehsilSearch', null, null, null, null, 1, 'SPR_dropdowns'); 
}
function SearchData() {
    var FromDate = '';
    var ToDate = '';
    if ($("#CboFromSearch").val().length > 0) {
        FromDate = ([$("#CboFromSearch").val().split("/")[1], $("#CboFromSearch").val().split("/")[0], $("#CboFromSearch").val().split("/")[2]]).join("/");
    }
    if ($("#CboToSearch").val().length > 0) {
        ToDate = ([$("#CboToSearch").val().split("/")[1], $("#CboToSearch").val().split("/")[0], $("#CboToSearch").val().split("/")[2]]).join("/");
    }
    executewithFillData(
        {
            'OpCode': 6,
            'FK_DisttID': $('#CboDistrictSearch option:selected').val(),
            'FK_TehsilID': $('#CboTehsilSearch option:selected').val(),
            'FK_PropertyTypeID': $('#cboPTypeSearch option:selected').val(),
            'Search': $('#CboFTSearch').val(),
            'SearchVal': $('#cboFTDDSearch').val(),
            'FromDate': FromDate,
            'ToDate': ToDate,
        }
        , 'SPR_Revenue');
}
function printData() {
    var FromDate = '';
    var ToDate = '';
    if ($("#CboFromSearch").val().length > 0) {
        FromDate = ([$("#CboFromSearch").val().split("/")[1], $("#CboFromSearch").val().split("/")[0], $("#CboFromSearch").val().split("/")[2]]).join("/");
    }
    if ($("#CboToSearch").val().length > 0) {
        ToDate = ([$("#CboToSearch").val().split("/")[1], $("#CboToSearch").val().split("/")[0], $("#CboToSearch").val().split("/")[2]]).join("/");
    }
    executewithFillDataandprint(
        {
            'OpCode': 7,
            'FK_DisttID': $('#CboDistrictSearch option:selected').val(),
            'FK_TehsilID': $('#CboTehsilSearch option:selected').val(),
            'FK_PropertyTypeID': $('#cboPTypeSearch option:selected').val(),
            'Search': $('#CboFTSearch').val(),
            'SearchVal': $('#cboFTDDSearch').val(),
            'FromDate': FromDate,
            'ToDate': ToDate,
        }
        , 'SPR_Revenue');
}
function revenuesummary(responses) {
    var date = "<a></a>";
    var area = "<a></a>";
    var PType = "<a></a>";
    var SearchField = "<a></a>";
    if ($("#CboFromSearch").val() != '' && $("#CboToSearch").val() != '') {
        date = "<a>" + $("#CboFromSearch").val() +" to " + $("#CboToSearch").val() + "</a>";
    }
    if ($("#CboDistrictSearch option:selected").val() != '') {
        area = "<a>" + $("#CboDistrictSearch option:selected").text() + "</a>";
    }
    if ($("#CboDistrictSearch option:selected").val() != '' && $("#CboTehsilSearch option:selected").val() != '') {
        area = "<a>" + $("#CboTehsilSearch option:selected").text() + ", " + $("#CboDistrictSearch option:selected").text()+ "</a>";
    }
    if ($("#cboPTypeSearch option:selected").val() != '') {
        if ($("#cboPTypeSearch option:selected").text() == 'Commercial') {
            PType = "<a>(C)</a>";
        } else {
            PType = "<a>(R)</a>";
        }
    }
    if ($("#CboFTSearch").val() != '') {
        SearchField ="<a>" + $('#cboFTDDSearch option:selected').text() + ": " + $('#CboFTSearch').val() + "</a>";
    }
    _html = "<div id='#simple_table' class='containerpdf'>"
        + "<div class='lghd'>"
        + "<div class='logo'>"
        + "<img src='Images/logo-lgkp.png'/>"
        + "</div>"
        + "<div class='head'>"
        + "<h4>Revenue Summary</h4>"
        + "<p>" + area + PType + "</p>"
        + "<p>" + date + "</p>"
        + "<p>" + SearchField + "</p>"
        + "</div>"
        + "</div>"
        
        + "<div class='Search-grid'>"
        + "<table class='pdfTable'>"
        + "<thead>"
        + "<tr class='pdfTabletr'>"
        + "<th class='pdfTableth'>SR.NO#</th>"
        + "<th class='pdfTableth'>Date</th>"
        + "<th class='pdfTableth'>Property Deails</th>"
        + "<th class='pdfTableth'>Transfer From</th>"
        + "<th class='pdfTableth'>Transfer To</th>"
        + "<th class='pdfTableth'>Amount</th>"
        + "</tr>"
        + "</thead>"
        + "<tbody>"
        var xmlDoc = $.parseXML(responses.d);
        var xml = $(xmlDoc);
        var table = xml.find("Table");
        var Tbl = $('#searchGrid').DataTable();
        Tbl.clear();
        var count = 0;
        if (table.length > 0) {
            table.each(function () {
                count += 1;
                
                Tbl.row.add([

                    _html = _html + " <tr class='pdfTabletr'>"
                    + " <td class='pdfTabletd'>" + count + "</td>"
                    + "<td class='pdfTabletd'>" + $(this).find("TransferDate").text() + "</td>"
                    + "<td class='pdfTabletd'>" + $(this).find("PDType").text() + "</td>"
                    + " <td class='pdfTabletd'>" + $(this).find("FromUser").text() + "</td>"
                    + "<td class='pdfTabletd'>" + $(this).find("ToUser").text() + "</td>"
                    + " <td class='pdfTabletd'>" + $(this).find("Amount").text() + '</br><b>(Cost : ' + $(this).find("TotalCost").text() + ')</b>' + "</td>"
                    + " </tr >"
                     
                ]);
                Tbl.draw(false);
            });
        } else {
            _html = _html + " <td colspan=6 class='pdfTabletd' style='text-align:center'>No data available in table</td>"
            Tbl.draw(false);
    }

    _html = _html + "</tbody>"
        + "</table>"
        + "</div>"
        + "</div>"
    generatePDF(_html, 'landscape');
}
function generatePDF(_html, orientation) {
    // Choose the element that our invoice is rendered in.
    const element = document.getElementById('invoice');
    element.innerHTML = _html;
    
    // Choose the element and save the PDF for our user.
    var opt = {
        margin: 0,
        filename: 'Summary.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: orientation  }
    };
    html2pdf().set(opt).from(element).save();
}
function printDatagrid(responses) {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    var xmlDoc = $.parseXML(responses.d);
    var xml = $(xmlDoc);
    var TableData = xml.find("Table");
    TableData.each(function () {
        $("#cboDistrict").val($(this).find("FK_DisttID").text());
        $("#cboTehsil").val($(this).find("FK_TehsilID").text());
        $("#txtPType").val($(this).find("FK_PropertyTypeID").text());
        _html = "<div id='#simple_table' class='containerpdf_'>"
            + "<div class='lghd_'>"
            + "<div class='logo_'>"
            + "<img src='Images/logo-lgkp.png' />"
            + "</div>"
            + "<div class='head_'>"
            + "<h3>Revenue Summary</h3>"
            + "</div>"
            + "</div>"
            + "</br></br>"
            + "<h4>Property Detail</h4>"
            + "<table class='pdfTable_'>"
            + "<tbody>"
            + "<tr>"
            + "<td class='pdfTabletd_'><b>Tehsil/ District</b></td>"
            + "<td colspan='3' class='pdfTabletd_'>" + $("#cboTehsil option:selected").text() + ", " + $("#cboDistrict option:selected").text()+ "</td>"
                + "<td class='pdfTabletd_'><b>Date</b></td>"
            + "<td class='pdfTabletd_'>" + $(this).find("TransferDate").text() +"</td>"
            + "</tr>"
            + "<tr>"
            + "<td class='pdfTabletd_'><b>Property Type</b></td>"
            + "<td class='pdfTabletd_'>" + $("#txtPType option:selected").text() + "</td>"
            + "<td class='pdfTabletd_'><b>Total Cost</b></td>"
            + "<td class='pdfTabletd_'>" + $(this).find("TotalCost").text() +"</td>"
            + "<td class='pdfTabletd_'><b>Tax</b></td>"
            + "<td class='pdfTabletd_'>" + $(this).find("Amount").text()+"</td>"
            + "</tr>"
            + "<tr>"
            + "<td class='pdfTabletd_'><b>Property</b></td>"
            + "<td colspan='5' class='pdfTabletd_'>" + $(this).find("Property").text() + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td class='pdfTabletd_'><b>Remarks</b></td>"
            + "<td colspan='5' class='pdfTabletd_'>" + $(this).find("Remarks").text() +"</td>"
                + "</tr>"
                + "</tbody>"
            + "</table>"
            + "</br></br>"
            + "<h4>Customer Information</h4>"
            + "<table class='pdfTable_'>"
            + "<thead>"
            + "<th class='pdfTableth_'></th>"
            + "<th class='pdfTableth_'>Owner</th>"
            + "<th class='pdfTableth_' >Transferee</th>"
            + "</thead>"
            + "<tbody>"
            + "<tr>"
            + "<td class='pdfTabletd_'><b>Name</b></td>"
            + "<td class='pdfTabletd_'>" + $(this).find("FUser").text() + "</td>"
            + "<td class='pdfTabletd_' >" + $(this).find("TUser").text() + "</td>"
            + "</tr>"
            + "<tr>"
            + "<td class='pdfTabletd_'><b>CNIC</b></td>"
            + "<td class='pdfTabletd_'>" + $(this).find("FCNIC").text() + "</td>"
            + "<td class='pdfTabletd_' >" + $(this).find("TCNIC").text() + "</td>"
            + "</tr>"
            + "<tr>"
            + "<td class='pdfTabletd_'><b>Email</b></td>"
            + "<td class='pdfTabletd_'>" + $(this).find("FMail").text() + "</td>"
            + "<td class='pdfTabletd_' >" + $(this).find("TMail").text() + "</td>"
            + "</tr>"
            + "<tr>"
            + "<td class='pdfTabletd_'><b>Cell No</b></td>"
            + "<td class='pdfTabletd_'>" + $(this).find("FCellNo").text() + "</td>"
            + "<td class='pdfTabletd_'>" + $(this).find("TCellNo").text() + "</td>"
            + "</tr>"
            + "</tbody>"
            + "</table>"
            + "</br> </br> </br></br> </br> </br>"
            + "<div class='footer_'>"
            + "<div>"
            + "<p class='footerdt_'> <b>Print Date and Time: </b>" + date +" "+time+"</p>"
            + "</div>"
            + "<div>"
            + "<p> ___________________ </p>"
            + "<p class='footersig_'> <b>Signature</b></p>"
            + "</div>"
            + "</div>"
            + "</body>"
        
        generatePDF(_html, 'portrait');
    })
}
function calTAmount() {
    var Cost = '', tax = '';
    Cost = parseFloat($("#TxtTCost").val());
    tax = parseFloat($("#TxtPercet").val());
    taxA = parseFloat($("#TxtTAmount").val());
    if (Cost > 0 && tax > 0) {
        $("#TxtTAmount").removeAttr('disabled');
        $("#TxtTAmount").val(((Cost * tax) / 100));
    }
    else {
        $("#TxtTAmount").val('0.0');
        $("#TxtTAmount").attr('disabled', 'disabled');
    }
}
function calTax(){
    $("#TxtPercet").val((parseFloat(($("#TxtTAmount").val() * 100) / $("#TxtTCost").val())));
}
 function InsertData() {
    if (ValidateTextBox($("#TxtPDetail"), 'Property Type cannot not be empty')
    ) {
        var TransferDate = ([$("#TDate").val().split("/")[1], $("#TDate").val().split("/")[0], $("#TDate").val().split("/")[2]]).join("/");
        var SendSMS = '';
        var isVerified = '';
        $('#SendSMS').is(':checked') ? (SendSMS = 'True') : (SendSMS = 'False');
        $('#VerifyData').is(':checked') ? (isVerified = 'True') : (isVerified = 'False');

        executewithFillData(
            {
                'OpCode': 2,
                'RevenueID': $("#hdnPrimaryFieldID").val(),
                'FK_DisttID': $("#cboDistrict").val(),
                'FK_TehsilID': $("#cboTehsil").val(),
                'FK_PropertyTypeID': $("#txtPType").val(),
                'Property': $("#TxtPDetail").val(),
                'Remarks': $("#TxtRemarks").val(),
                'TotalCost': $("#TxtTCost").val(),
                'Tax': $("#TxtPercet").val(),
                'Amount': $("#TxtTAmount").val(),
                'TransferDate': TransferDate,
                'FUser': $("#TxtFrom").val(),
                'FCNIC': $("#TxtFCNIC").val(),
                'FMail': $("#TxtFMail").val(),
                'FCellNo': $("#TxtFCellNo").val(),
                'TUser': $("#TxtTo").val(),
                'TCNIC': $("#TxtTCNIC").val(),
                'TMail': $("#TxtTMail").val(),
                'TCellNo': $("#TxtTCellNo").val(),
                'SendSMS': SendSMS,
                'isVerified': isVerified
            }
            , 'SPR_Revenue');
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

                printhtml = "PrintData(1,'RevenueID'," + $(this).find("RevenueID").text() + ",'SPR_Revenue')";
                edithtml = "FillData(1,'RevenueID'," + $(this).find("RevenueID").text() + ",'SPR_Revenue')";
                delhtml = "DeleteRow(3,'RevenueID'," + $(this).find("RevenueID").text() + ",'SPR_Revenue')";
                if ($(this).find("isVerified").text() == 'true') {
                    isVerify = '<a><img src="ICON/checked.png" width="20" height="20" /></a>&ensp;|&ensp;'
                } else if ($(this).find("isVerified").text() == 'false') {
                    isVerify = '<a><img src="ICON/cancel.png" width="20" height="20" /></a>&ensp;|&ensp;'
                } else {
                    isVerify = '&ensp;'
                }
                
                Tbl.row.add([
                     
                    /*count,*/
                    $(this).find("TransferDate").text(),
                    $(this).find("PDType").text(),
                    $(this).find("FromUser").text(),
                    $(this).find("ToUser").text(),
                    $(this).find("Amount").text() + '</br><b>(Cost :' + $(this).find("TotalCost").text() + ')</b>',
                    isVerify +
                    '<a href="#" id="btnPrint" onclick=' + printhtml + '><img src="ICON/pdf.png" width="20" height="20" /></a>&ensp;|&ensp;' +
                    '<a href="#" id="btnEdit" onclick=' + edithtml + '><img src="ICON/edit.png"  width="20" height="20" /></a>&ensp;|&ensp;' +
                    '<a href="#" id="btnDelete" onclick=' + delhtml + '><img src="ICON/delete.png" width="20" height="20"/></a>'
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
        $("#hdnPrimaryFieldID").val($(this).find("RevenueID").text());
        $("#cboDistrict").val($(this).find("FK_DisttID").text());
        loadTehsil($(this).find("FK_DisttID").text(), $(this).find("FK_TehsilID").text());
        $("#cboTehsil").val($(this).find("FK_TehsilID").text());
        $("#TxtPDetail").val($(this).find("Property").text());
        $("#TxtRemarks").val($(this).find("Remarks").text()); 
        $("#TxtTCost").val($(this).find("TotalCost").text());
        $("#TxtPercet").val($(this).find("Tax").text());
        $("#TxtTAmount").val($(this).find("Amount").text());
        $("#TDate").val($(this).find("TransferDate").text());
        $("#TxtFrom").val($(this).find("FUser").text());
        $("#TxtFCNIC").val($(this).find("FCNIC").text());
        $("#TxtFMail").val($(this).find("FMail").text());
        $("#TxtFCellNo").val($(this).find("FCellNo").text());
        $("#TxtTo").val($(this).find("TUser").text());
        $("#TxtTCNIC").val($(this).find("TCNIC").text());
        $("#TxtTMail").val($(this).find("TMail").text());
        $("#TxtTCellNo").val($(this).find("TCellNo").text());
        $("#txtPType").val($(this).find("FK_PropertyTypeID").text());
        if ($(this).find("SendSMS").text() == 'true') {
            document.getElementById("SendSMS").checked = true;
        } else {
            document.getElementById("SendSMS").checked = false;
        }
        if ($(this).find("isVerified").text() == 'true') {
            document.getElementById("VerifyData").checked = true;
        } else {
            document.getElementById("VerifyData").checked = false;
        }
        
        
    }) 
}