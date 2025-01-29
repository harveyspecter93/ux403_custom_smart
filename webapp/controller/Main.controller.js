sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.Main", {
        onInit: function () {
			const oSmartTable = this.getView().byId("LineItemsSmartTable");
			oSmartTable.attachBeforeRebindTable( oEvent => {
				let mBindingParams = oEvent.getParameters().bindingParams;
				mBindingParams.events.dataReceived = _ => {
					oSmartTable.getTable().getColumns().forEach( (oCol, index)  => {
						oCol.setWidth("100%");
					});
				};
			});
		},
		onBeforeExport: function (oEvt) {
			const mExcelSettings = oEvt.getParameter("exportSettings");
			// GW export
			if (mExcelSettings.url) {
				return;
			}
			// For UI5 Client Export --> The settings contains sap.ui.export.SpreadSheet relevant settings that be used to modify the output of excel

			// Disable Worker as Mockserver is used in Demokit sample --> Do not use this for real applications!
			mExcelSettings.worker = false;
		}
		
    });
});
