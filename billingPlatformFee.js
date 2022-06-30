const { forEach } = require("lodash");

(async () => {

    function compute(sessions, cpoIDs, context) {

        let total = 0;
        console.log("****************************************************************");
        sessions.forEach(session => {
            console.log("Session for " + session.cpoID + " - Amount: " + session.amount);
            total += session.amount;
        });

        let totalTVA;
        let totalHT;
        let totalTTC;
        if ( context.inclusive ) {
            totalTTC = total;
            totalHT  = totalTTC / ( 1 + taxRate / 100 );
            totalTVA  = totalTTC - totalHT;
        } else {
            totalHT = total;
            totalTVA  = total * taxRate / 100;
            totalTTC  = total + totalTVA;
        }
        console.log("------------------------------------------------");
        console.log("HT = "+  totalHT);
        console.log("TVA = "+  totalTVA);
        console.log("TTC = "+  totalTTC);
        console.log("------------------------------------------------");

        const stripeFee = totalTTC * context.stripeCommissionRate / 100;
        const stripeCommission = context.stripeFlatFee + stripeFee;
        // console.log("STRIPE FEE = "+ stripeCommission );
        // console.log("------------------------------------------------");
        
        const transfers = []
        cpoIDs.forEach( cpoID => {

            const cpoSessions = sessions.filter(session => session.cpoID === cpoID);
            let cumulatedAmount = 0;
            let cumulatedCommission = 0; 

            cpoSessions.forEach(session => {
                // ACHTUNG - session amount may include 4 dimensions !!! - but we have a single tax rate for now :(
                session.commission = context.platformFlatFee + session.amount * context.platformCommissionRate / 100;
                cumulatedAmount += session.amount;
                cumulatedCommission += session.commission;
            });

            transfers.push( { 
                cpoID,
                amount: cumulatedAmount,
                commission: cumulatedCommission,
            })
        });
        
        let cumulatedAmount = 0;
        let cumulatedCommission = 0;
        transfers.forEach(transfer => {
            cumulatedAmount += transfer.amount;
            cumulatedCommission += transfer.commission;
            console.log("Amount for "+ transfer.cpoID + " : " + transfer.amount + " - Commission: " + transfer.commission);
        }) 

        const taxesOnCommission = cumulatedCommission * context.platformTaxRate / 100;
        const totalCommission = cumulatedCommission + taxesOnCommission;

        // ACHTUNG - cumulatedAmount should never include taxes - Echec et mat!
        const totalTransferred = cumulatedAmount - totalCommission;
        console.log("------------------------------------------------");
        const payout = totalTTC - stripeCommission;
        console.log("Payout from STRIPE : " + payout);
        console.log("TVA collectée : " + totalTVA);
        console.log("TVA déductible : " + 0);
        console.log("------------------------------------------------");
        console.log("Montant Total : " + cumulatedAmount);
        console.log("Commission: " + cumulatedCommission);
        console.log("TVA on commission : " + taxesOnCommission);
        console.log("------------------------------------------------");
        console.log("Montant Transferé : " + totalTransferred);
        console.log("Commission with taxes : " + totalCommission);
        console.log("------------------------------------------------");
        const CA = payout - totalTransferred;
        console.log("Chiffre d'Affaire : " + CA);
        console.log("STRIPE FEE :  "+ stripeCommission );
        console.log("Platform FEE : " + totalCommission);
        const net  = CA - totalTVA - taxesOnCommission;
        console.log("NET : " + net);
        console.log("------------------------------------------------");

    }

    var  Decimal = require("decimal.js");
    const cpoIDs = [ "Eurecom", "ALD" ];
    const sessions = [ 
        {
            amount: 100,
            cpoID: cpoIDs[0]
        }, 
        {
            amount: 50,
            cpoID: cpoIDs[1]
        }
        , 
        {
            amount: 50,
            cpoID: cpoIDs[1]
        }
    ];

    const taxRate = 20; // percent
    const stripeFlatFee = 0.25;
    const stripeCommissionRate = 1.4;
    const platformFlatFee = 0.50;
    const platformCommissionRate = 2;
    const platformTaxRate = 20 // percent

    compute(sessions, cpoIDs, {
        taxRate, 
        inclusive: true,
        stripeFlatFee,
        stripeCommissionRate,
        platformFlatFee,
        platformCommissionRate,
        platformTaxRate, 
    });
})();
