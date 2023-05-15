<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="PdfSummary.aspx.cs" Inherits="PdfSummary" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .containerpdf {
            text-align: center;
            padding: 3em;
            max-width: 1000px auto;
            margin: 0;
            box-sizing: border-box;
            font-family: Georgia, 'Times New Roman', Times, serif;
            align-items: center;
        }

        .Search-item {
            margin-top: 10px;
            width: 100%;
        }

        .Search-grid {
            margin-top: 10px;
        }

        .pdfTable {
            align-items: center;
            border-collapse: collapse;
            width: 100%;
        }

        .pdfTableth {
           
            background-color: floralwhite;
        }

        .pdfTabletr {
            border-bottom: 1px solid black;
        }

        .pdfTableth, .pdfTabletd {
            text-align: left;
            padding: 2px;
            border:1px solid;
        }
    </style>
    <script>
        $(document).ready(function () {

            $(".Masking").mask("99/99/9999");
            FillDropDown(1, 'CboClientSearch', null, null, null, null, null, 0, 'SPR_dropdowns');
            FillDropDown(1, null, null, 'CboServiceSearch', null, null, null, 1, 'SPR_dropdowns');
           
        });


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
                        'OpCode': 6,
                        'FK_ClientID': $('#CboClientSearch option:selected').val(),
                        'FK_ServiceID': $('#CboServiceSearch option:selected').val(),
                        'FromDate': FromDate,
                        'ToDate': ToDate,
                    }
                    , 'SPR_Payments');
            }




            function revenuesummary(responses) {
                var FromDate = '';
                var ToDate = '';

                if ($("#CboFromSearch").val().trim() == "") {
                    FromDate = "NULL";
                } else {
                    FromDate = $("#CboFromSearch").val();
                }
                if ($("#CboToSearch").val().trim() == "") {
                    ToDate = "NULL";
                } else {
                    ToDate = $("#CboToSearch").val();
                }
                _html = "<div id='#simple_table' class='containerpdf'>"
                    + "<div class='logo'>"
                    + " <img widt = '50px' height = '50px'  src = 'Images/PDFLogo.JPEG' /> "
                    + "</div>"
                    + "<h1>Client Payment History</h1>"

                    + "<div class='date'>"
                    + "   <a>" + FromDate + "</a><a> to </a><a>" + ToDate + "</a>"
                    + "</div>"
                    + "<div class='Search-item'>"
                    + "<table class='pdfTable'>"
                    + "<tbody>"
                    + "<tr>"
                    + "<td class='pdfTabletd'>Client</td>"
                    + "<td class='pdfTabletd'>" + $('#CboClientSearch option:selected').text() + "</td>"
                    + "<td class='pdfTabletd'>Service</td>"
                    + "<td class='pdfTabletd'>" + $('#CboServiceSearch option:selected').text() + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "</tbody>"
                    + "</table>"
                    + "</div>"
                    + "<div class='Search-grid'>"
                    + "<table class='pdfTable'>"
                    + "<thead>"
                    + "<tr class='pdfTabletr'>"
                    + "<th class='pdfTableth'>SR.NO#</th>"
                    + "<th class='pdfTableth'>Date</th>"
                    + "<th class='pdfTableth'>Service</th>"
                    + "<th class='pdfTableth'>Paid</th>"
                    + "<th class='pdfTableth'>Due</th>"
                    + "<th class='pdfTableth'>Balance</th>"
                    + "</tr>"
                    + "</thead>"
                    + "<tbody>"

                var xmlDoc = $.parseXML(responses.d);
                var xml = $(xmlDoc);
                var table = xml.find("Table");
                var Tbl = $('#searchGrid').DataTable();
                Tbl.clear();
                var count = 0;
                var Total_Debit = 0;
                var Total_Credit = 0;
                var amount = 0;


                var TableRow = $(this);

                if (table.length > 0) {
                    table.each(function () {
                        count += 1;
                        if ($(this).find("Credit").text() > 0) {
                            amount = amount + parseFloat($(this).find("Credit").text());
                        }
                        else {
                            amount = amount - parseFloat($(this).find("Debit").text());
                        }

                        Total_Debit = Total_Debit + parseFloat(TableRow.find("Debit").text());

                        Tbl.row.add([

                            count,
                            _html = _html + " <tr class='pdfTabletr'>"
                            + " <td class='pdfTabletd'>" + count + "</td>"
                            + "<td class='pdfTabletd'>" + $(this).find("PaymentDate").text() + "</td>"
                            + "<td class='pdfTabletd'>" + $(this).find("AServices").text() + "</td>"
                            + " <td class='pdfTabletd'>" + $(this).find("Debit").text() + "</td>"
                            + "<td class='pdfTabletd'>" + $(this).find("Credit").text() + "</td>"
                            + " <td class='pdfTabletd'>" + amount + '</br><b>(' + $(this).find("Balance").text() + ')</b>' + "</td>"
                            + " </tr >"

                        ]);
                        Tbl.draw(false);
                    });
                } else {
                    Tbl.draw(false);
                }
                _html = _html + "<tr id='inbold'>"

                    + " <td style='text-align: right'>Total</td>"

                    + "<td>" + Total_Debit + "<p> _______</p></td>"

                    + " <td style='text-align: right'>Total</td>"
                    + "<td>" + Total_Credit + "<p> _______</p></td>"
                    + " <td style='text-align: right'>Total</td>"
                    + "<td>" + amount + "<p> _______</p></td>"
                    + " </tr> </table> </div > "
                    + "  <br/>"
                    + " </div>"
                    + "</tbody>"
                    + "</table>"
                    + "</div>"
                    + "</div>"
                generatePDF(_html);
            }



            function generatePDF(_html) {
                // Choose the element that our invoice is rendered in.
                const element = document.getElementById('invoice');
                element.innerHTML = _html;

                // Choose the element and save the PDF for our user.

                html2pdf().from(element).save();

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
                        printhtml = "PrintData(1,'PayID'," + $(this).find("PayID").text() + ",'SPR_Payments')";
                        edithtml = "FillData(1,'PayID'," + $(this).find("PayID").text() + ",'SPR_Payments')";

                        Tbl.row.add([

                            count,
                            $(this).find("PaymentDate").text(),
                            $(this).find("AServices").text(),
                            $(this).find("FromUser").text(),
                            $(this).find("ToUser").text(),
                            $(this).find("Balance").text() + '</br><b>(Cost :' + $(this).find("Total").text() + ')</b>'
                        ]);
                        Tbl.draw(false);
                    });
                } else {
                    Tbl.draw(false);
                }

            }
        }



        function printDatagrid(responses) {
            var xmlDoc = $.parseXML(responses.d);
            var xml = $(xmlDoc);
            var TableData = xml.find("Table");
            TableData.each(function () {
                $("#CboClientSearch").val($(this).find("FK_ClientID").text());
                $("#CboServiceSearch").val($(this).find("FK_ServiceID").text());
                $("#txtPType").val($(this).find("FK_PropertyTypeID").text());
                _html = "<div id='#simple_table' class='containerpdf_'>"
                    + "<div class='logo_'>"
                    + " <h1>this is logo</h1>"
                    + "</div>"
                    + "<h3>Revenue Summary</h3>"
                    + "<table class='pdfTable_'>"
                    + "<tbody>"
                    + "<tr>" + "<td class='pdfTabletd_'>Transfer Date</td>" + "<td class='pdfTabletd_'>" + $(this).find("PayDate").text() + "</td>" + "</tr>"
                    + "<tr>" + "<td class='pdfTabletd_'>Service</td>" + "<td class='pdfTabletd_'>" + $(this).find("AServices").text() + "</td>" + "</tr>"
                    + "<tr>" + "<td class='pdfTabletd_'>Client</td>" + "<td class='pdfTabletd_'>" + $("#CboClientSearch option:selected").text() + "</td>" + "</tr>"
                    + "<tr>" + "<td class='pdfTabletd_'>Service</td>" + "<td class='pdfTabletd_'>" + $("#CboServiceSearch option:selected").text() + "</td>" + "</tr>"
                    + "<tr>" + "<td class='pdfTabletd_'>Transfer From</td>" + "<td class='pdfTabletd_'>" + $(this).find("FUser").text() + "</td>" + "</tr>"
                    + "<tr>" + "<td class='pdfTabletd_'>Transfer To</td>" + "<td class='pdfTabletd_'>" + $(this).find("TUser").text() + "</td>" + "</tr>"

                    + "</tbody>"
                    + "</table>"
                    + "</br>" + "</br>" + "</br>"
                    + "<div class='footer_'>"
                    + "<p> ___________________ </p>"
                    + "<p class='footerp_'> Signature </p>"
                    + "</div>"
                    + "</div>"
                generatePDF(_html);
            });
        }


    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div class="app-content page-body">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card">

                        <div class="card-header" style="float: left; margin-top: 10px; margin-bottom: 10px; width: 100%">
                            <div class="form-group" style="width: 40%">
                                <h4>Summary</h4>
                            </div>
                            <div class="row" style="width: 100%">
                                <div class="col-lg-3 col-md-3 col-sm-12">
                                    <label class="txtwhite">Client</label>
                                    <select id="CboClientSearch" class="form-control Search">
                                    </select>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-3">
                                    <label class="txtwhite">Service</label>
                                    <select id="CboServiceSearch" class="form-control Search">
                                    </select>
                                </div>


                                <div class="col-lg-3 col-md-3 col-sm-2">
                                    <label class="txtwhite">From</label>
                                    <input id="CboFromSearch" type="text" class="form-control Masking " />
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-2">
                                    <label class="txtwhite">To</label>
                                    <input id="CboToSearch" type="text" class="form-control Masking " />
                                </div>

                            </div>
                        </div>

                        <div class="col-lg-2 col-md-2 col-sm-2" style="margin-top: 20px">
                            <button type="button" id="BtnPrint" class="btn btn-primary" onclick="printData();">Print Data</button>
                        </div>
                        <div class="modal fade show" id="largemodal1" tabindex="-1" role="dialog" aria-labelledby="largemodal" aria-hidden="true">
                            <div id="invoice">
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>


</asp:Content>

