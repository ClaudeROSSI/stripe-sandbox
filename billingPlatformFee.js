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
            let amountToTransfer = 0;
            let commissionHT = 0; 
            let commissionTVA = 0;
            let commissionTTC = 0 ; 

            cpoSessions.forEach(session => {
                if ( context.inclusive ) {
                    session.amountHT = session.amount / ( 1 + context.taxRate / 100 );
                } else {
                    session.amountHT = session.amount;
                }
                const commission = context.platformFlatFee + session.amountHT * context.platformCommissionRate / 100;
                session.commissionHT = commission;
                session.commissionTVA = commission * platformCommissionRate / 100;
                session.commissionTTC = commission * (1 + platformCommissionRate / 100);

                session.amountToTransfer = (session.amountHT - session.commissionTTC);

                commissionTVA += session.commissionTVA;
                commissionTTC += session.commissionTTC;
                amountToTransfer += session.amountToTransfer;
            });

            transfers.push( { 
                cpoID,
                amountToTransfer,
                commissionHT,
                commissionTVA,
                commissionTTC,

            })
        });
        
        let totalTransferred = 0;
        let totalTvaCollectee = 0;
        let totalCommissionTTC = 0;
        transfers.forEach(transfer => {
            totalTransferred += transfer.amountToTransfer;
            totalTvaCollectee += transfer.commissionTVA;
            totalCommissionTTC += transfer.commissionTTC;
            console.log("Amount for "+ transfer.cpoID + " : " + transfer.amountToTransfer + " - Commission: " + transfer.commissionTTC + " - TVA collectée: " + transfer.commissionTVA);
        }) 
        
        console.log("------------------------------------------------");
        const payout = totalTTC - stripeCommission;
        console.log("Payout from STRIPE : " + payout);
        console.log("TVA collectée : " + totalTVA);
        console.log("TVA déductible : " + 0);
        console.log("------------------------------------------------");
        console.log("Montant versé : " + totalTransferred);
        console.log("Commission TTC : " + totalCommissionTTC);
        console.log("TVA collectée : " + totalTvaCollectee);
        console.log("------------------------------------------------");
        const CA = payout - totalTransferred;
        console.log("Chiffre d'Affaire : " + CA);
        console.log("STRIPE FEE :  "+ stripeCommission );
        console.log("Platform FEE : " + totalCommissionTTC);
        const benefice  = CA - totalTVA - totalTvaCollectee;
        console.log("Benefice : " + benefice);
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
        inclusive: false,
        stripeFlatFee,
        stripeCommissionRate,
        platformFlatFee,
        platformCommissionRate,
        platformTaxRate, 
    });
})();
