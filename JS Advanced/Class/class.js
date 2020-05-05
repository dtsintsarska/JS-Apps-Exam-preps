class Bank {

    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }

    newCustomer(customer) {

        let match = this.allCustomers.find((x) => x.firstName == customer.firstName && x.lastName == customer.lastName && x.personalId == customer.personalId)

        if (match) {
            throw new Error(`${match.firstName} ${match.lastName} is already our customer!`)
        }

        customer.totalMoney = 0
        customer.transactions = []
        this.allCustomers.push(customer)

        let firstName = customer.firstName
        let lastName = customer.lastName
        let personalId = customer.personalId

        let client = {
            firstName,
            lastName,
            personalId
        }

        return (client)
    }

    depositMoney(personalId, amount) {

        let client = this.allCustomers.find((x) => x.personalId == personalId)

        if (client === undefined) {
            throw new Error(`We have no customer with this ID!`)
        }

        client.totalMoney += amount
        client.transactions.push(`${client.firstName} ${client.lastName} made deposit of ${amount}$!`)

        return `${client.totalMoney}$`
    }

    withdrawMoney(personalId, amount) {

        let client = this.allCustomers.find((x) => x.personalId == personalId)

        if (client === undefined) {
            throw new Error(`We have no customer with this ID!`)
        }

        if (client.totalMoney < amount) {
            throw new Error(`${client.firstName} ${client.lastName} does not have enough money to withdraw that amount!`)
        }

        client.totalMoney -= amount
        client.transactions.push(`${client.firstName} ${client.lastName} withdrew ${amount}$!`)

        return `${client.totalMoney}$`

    }

    customerInfo(personalId) {
        let client = this.allCustomers.find((x) => x.personalId == personalId)

        if (client === undefined) {
            throw new Error(`We have no customer with this ID!`)
        }

        let output = ''
        output += `Bank name: ${this._bankName}\nCustomer name: ${client.firstName} ${client.lastName}\nCustomer ID: ${client.personalId}\n`

        output += `Total Money: ${client.totalMoney}$\nTransactions:\n`

        for (let i = client.transactions.length - 1; i >= 0; i--) {
            let transaction = client.transactions[i]
            output += `${i + 1}. ${transaction}\n`
        }

        return output.trim()

    }

}







let bank = new Bank('SoftUni Bank');

console.log(bank.newCustomer({
    firstName: 'Svetlin',
    lastName: 'Nakov',
    personalId: 6233267
}));
console.log(bank.newCustomer({
    firstName: 'Mihaela',
    lastName: 'Mileva',
    personalId: 4151596
}));

bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596, 555);

console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(6233267));