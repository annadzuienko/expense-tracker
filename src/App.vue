<template>
  <div>
    <Header />
    <div class="container">
      <Balance :total="+total" />
    </div>
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'

import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const transactions = ref([])

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))
  if (savedTransactions && savedTransactions.length) {
    transactions.value = savedTransactions
  }
})

const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)
})

const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2)
})

const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2)
})

const generateUniqueId = () => {
  return Math.floor(Math.random() * 10000)
}

const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    ...transactionData,
  })
  saveTransactionsToLocalStorage()
  toast.success('Transaction added!')
}

const handleTransactionDeleted = (id) => {
  const newTransactions = transactions.value.filter((transaction) => transaction.id !== id)
  transactions.value = [...newTransactions]

  saveTransactionsToLocalStorage()
  toast.success('Transaction deleted.')
}

const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>
