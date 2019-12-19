window.onload = function(){
    let app = new Vue ({
        el: '#app',
        data: {
            invoice: {
                tax: 0.25,
                items: [{
                    position: 1,
                    description:'',
                    rate: new Number(0.0),
                    amount: new Number(1)
                }]
            }
        },
        methods: {
            addNewItem: function(){
                let position = this.invoice.items.length + 1;
                this.invoice.items.push({position: position, description: '', rate: 0.0, amount: 1});
            },
            calculateSubtotal: function(){
                let sub = Dinero({amount: 0, currency: 'EUR'});
                this.invoice.items.forEach(i=>{
                    let rate = i.rate * 100; // get amount in minor currency unit
                    let value = Dinero({amount: rate, currency: 'EUR'}).multiply(i.amount);
                    sub = sub.add(value);
                });
                return sub;
            }
        }, 
        computed: {
            subtotal: function(){
                let subtotal = this.calculateSubtotal();
                let value = subtotal.toFormat('$0,0.00');
                return value;
            },
            total: function(){
                let subtotal = this.calculateSubtotal();
                let tax = subtotal.multiply(this.invoice.tax);
                let total = tax.add(subtotal);
                return total.toFormat('$0,0.00');
            }
        }
    });
}