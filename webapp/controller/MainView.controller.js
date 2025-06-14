sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.training.exercise1tatad.controller.MainView", {
        onInit: function () {
            // Initialization logic
        },

        // Add button handler
        onAddItem: function () {
            var sMsg = this.getView().getModel("i18n").getResourceBundle().getText("addButtonMsg");
            MessageToast.show(sMsg);
        },

        // Checkout button handler
        onPressCheckout: function (){
            var oInputFName = this.getView().byId("idInptFName");
            var oInputLName = this.getView().byId("idInptLName");
            var oInputFNameValue = oInputFName.getValue();
            var oInputLNameValue = oInputLName.getValue();
            var oRouter = this.getOwnerComponent().getRouter();

            // Check if first name and last name is blank
            if (oInputFNameValue === "" || oInputLNameValue === ""){
               
            // set value state to Error
                oInputFName.setValueState("Error");
                oInputLName.setValueState("Error");
            } else {
                oInputFName.setValueState("None");
                oInputLName.setValueState("None");

                //Navigate to review page passing first
                oRouter.navTo("RouteReviewPage", {
                    firstName: oInputFNameValue
                });

            }
        },
        // Mode of Payment change handler
        onChangeMOP: function (oEvent) {
            var sSelectedKey = oEvent.getSource().getSelectedKey();
            var oLblPhone = this.byId("idLblPhone");
            var oInputPhone = this.byId("idInputPhone");
            var oLblCard = this.byId("idLblCard");
            var oInputCard = this.byId("idInputCard");

            // Show or hide phone number field
            if (sSelectedKey === "CC") {
                oLblPhone.setVisible(true);
                oInputPhone.setVisible(true);
                oLblCard.setVisible(true);
                oInputCard.setVisible(true);
            } else {
                oLblPhone.setVisible(false);
                oInputPhone.setVisible(false);
                oLblCard.setVisible(false);
                oInputCard.setVisible(false);
            }

            // Show selected mode of payment in MessageToast
            var sMOPText = oEvent.getSource().getSelectedItem().getText();
            MessageToast.show("Selected Mode of Payment: " + sMOPText);
        },
         onAddItem: function (){
                // Comment this code for now
                // var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                // var sMsg = oTextBundle.getText("addButtonMsg");
                        // this.fnDisplayMsg(sMsg);

                // Instantiate the fragment

                // create dialog lazily
                if (!this.oDialog) {
                    // By using loadFragment, we are adding the fragment as a dependent to the View
                    // By doing so, we can use the functions inside the view's controller
                    this.oDialog = this.loadFragment({
                        name: "com.acn.training.excer1tatad.fragment.ProductDialog"
                    });
                } 
                this.oDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },
            onCloseDialog: function (){
                this.getView().byId("idProductDialog").close();
            }

    });
});