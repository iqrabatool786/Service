<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Revenue.aspx.cs" Inherits="Default2" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row" style="margin-bottom: 15px">
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <label class="txtwhite">Search: </label>
                            <input id="CboFTSearch" type="text" class="form-control Search" >
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <label class="txtwhite">Field:</label>
                            <select id="cboFTDDSearch" class="form-control Search" onchange="cnicMasking();">
                                <option value='tbl_Revenue.FUser' selected="selected">Owner Name</option>
                                <option value='tbl_Revenue.FCNIC'>Owner CNIC</option>
                                <option value='tbl_Revenue.TUser'>Transferee Name</option>
                                <option value='tbl_Revenue.TCNIC'>Transferee CNIC</option>
                            </select>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <label class="txtwhite">District</label>
                            <select id="CboDistrictSearch" class="form-control Search" onchange="loadTehsilS(this.value);">
                            </select>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <label class="txtwhite">Tehsil</label>
                            <select id="CboTehsilSearch" class="form-control Search">
                            </select>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <label class="txtwhite">From</label>
                            <input id="CboFromSearch" type="text" class="form-control Masking " />
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <label class="txtwhite">To</label>
                            <input id="CboToSearch" type="text" class="form-control Masking " />
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <label class="txtwhite">Property Type:</label>
                            <select id="cboPTypeSearch" class="form-control ">
                            </select>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2" style="margin-top: 20px">
                            <button type="button" id="Btnsearch" class="btn btn-primary" onclick=" SearchData();">Search</button>
                        </div>
                         <div class="col-lg-2 col-md-2 col-sm-2" style="margin-top: 20px">
                            <button type="button" id="BtnPrint" class="btn btn-primary" onclick="printData();">Print Data</button>
                        </div>
                        <div class="modal fade show" id="largemodal1" tabindex="-1" role="dialog" aria-labelledby="largemodal" aria-hidden="true">
                        <div id="invoice" >

                        </div>
                            </div>
                        <div class="col-lg-2 col-md-2 col-sm-2" style="margin-top: 20px">
                            <button type="button" id="Btnadd" class="btn btn-primary" data-target="#largemodal" data-toggle="modal">Add Data</button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table id="example3" class="table table-bordered text-nowrap dataTable no-footer dtr-inline" data-page-length="1000">
                            <thead>
                                <tr>
                                    
                                    <th>Date</th>
                                    <th>Property Deails</th>
                                    <th>Owner</th>
                                    <th>Transferee</th>
                                     <th>Amount</th>
                                    <th >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade show" id="largemodal" tabindex="-1" role="dialog" aria-labelledby="largemodal" aria-hidden="true">
        <div class="modal-dialog modal-lg " role="document">
            <div class="modal-content modal-content-demo">
                <div class="modal-header">
                    <h2 class="modal-title" id="lbltitle">Add/ Edit Revenue</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="cleartextbox();">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <input type="hidden" id="hdnPrimaryFieldID" />

                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <label class="txtwhite">District:</label>
                            <select id="cboDistrict" class="form-control" onchange="loadTehsil(this.value);">
                            </select>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <label class="txtwhite">Tehsil:</label>
                            <select id="cboTehsil" class="form-control">
                            </select>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12">

                            <hr style="margin-bottom: 0px">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <label class="txtwhite">Property Type:</label>
                            <select id="txtPType" class="form-control ">
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <label class="txtwhite">Property Detail:</label>
                            <input id="TxtPDetail" type="text" class="form-control clrtxt" />
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <label class="txtwhite">Remarks:</label>
                            <input id="TxtRemarks" type="text" class="form-control clrtxt" />
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <label class="txtwhite">Total Cost:</label>
                            <input id="TxtTCost" type="text" class="form-control clrtxt" onkeyup="calTAmount()" />
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <label class="txtwhite">Tax(%):</label>
                            <input id="TxtPercet" type="text" name="tax" value="2" class="form-control" onkeyup="calTAmount()" />
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <label class="txtwhite">Tax Amount:</label>
                            <input id="TxtTAmount" type="text" disabled="disabled" onkeyup="calTax()" class="form-control clrtxt" />
                        </div>

                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <label class="txtwhite">Transfer Date</label>
                            <input id="TDate" type="text" class="form-control Masking">
                        </div>

                        <div class="col-lg-12 col-md-12 col-sm-12">

                            <hr style="margin-bottom: 0px">
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <label class="txtwhite">Transfer From Name:</label>
                            <input id="TxtFrom" type="text" class="form-control clrtxt" />
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3" style="padding-left: 0.01rem">
                            <label class="txtwhite">CNIC:</label>
                            <input id="TxtFCNIC" type="text" class="form-control MaskingA clrtxt" maxlength="15"/>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4" style="padding-left: 0.01rem">
                            <label class="txtwhite">Email:</label>
                            <input id="TxtFMail" type="email" class="form-control clrtxt" />
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2" style="padding-left: 0.01rem">
                            <label class="txtwhite">Cell No:</label>
                            <input id="TxtFCellNo" type="text" onkeyup="isint(this);" placeholder="03000000000" maxlength="11" class="form-control clrtxt" />
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <hr style="margin-bottom: 0px">
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <label class="txtwhite">Transfer To Name:</label>
                            <input id="TxtTo" type="text" class="form-control clrtxt" />
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3" style="padding-left: 0.01rem">
                            <label class="txtwhite">CNIC:</label>
                            <input id="TxtTCNIC" type="text" class="form-control MaskingA clrtxt" maxlength="15"/>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4" style="padding-left: 0.01rem">
                            <label class="txtwhite">Email:</label>
                            <input id="TxtTMail" type="email" class="form-control clrtxt" />
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2" style="padding-left: 0.01rem">
                            <label class="txtwhite">Cell No:</label>
                            <input id="TxtTCellNo" type="text" onkeyup="isint(this);" placeholder="03000000000" maxlength="11" class="form-control clrtxt" />
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <hr style="margin-bottom: 0px">
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3" style="padding: 5px">
                            <label class="txtwhite" style="margin-top: 5px">Send SMS </label>
                            <input id="SendSMS" type="checkbox"  class="form-control clrtxt" style="margin-top: -28px; height:calc(0.8em + 0.5rem + 0px);" />
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3" style="padding: 5px">
                            <label class="txtwhite" style="margin-top: 5px">Verify</label>
                            <input id="VerifyData" type="checkbox" class="form-control clrtxt" style="margin-top: -28px; height:calc(0.8em + 0.5rem + 0px);" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="InsertData();">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cleartextbox();">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
            integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="js/Revenue.js"></script>
</asp:Content>
