<template>
    <MenuAdmin pageIndex="/admin" />
    <div class="user-page">
        <h1>管理员页面</h1>

        <div class="ticket-selection">
            <h2>进入主页是看不到导航栏的，然后以用户身份登陆进来这里。</h2>
            <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
                <h3>{{ ticket.name }}</h3>
                <p>{{ ticket.description }}</p>
                <p>Price: ${{ ticket.price }}</p>
                <button @click="selectTicket(ticket)">Select</button>
            </div>
        </div>

        <div v-if="selectedTicket" class="ticket-details">
            <h2>Selected Ticket Details</h2>
            <h3>{{ selectedTicket.name }}</h3>
            <p>{{ selectedTicket.description }}</p>
            <p>Price: ${{ selectedTicket.price }}</p>
            <button @click="purchaseTicket">Purchase</button>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    name: "UserPage",
    setup() {
        const tickets = ref([
            {
                id: 1,
                name: "Standard Ticket",
                description: "Access to standard seating area",
                price: 20,
            },
            {
                id: 2,
                name: "VIP Ticket",
                description: "Access to VIP seating area",
                price: 50,
            },
            {
                id: 3,
                name: "Premium Ticket",
                description: "Access to premium seating area",
                price: 80,
            },
        ]);

        const selectedTicket = ref(null);

        const selectTicket = (ticket) => {
            selectedTicket.value = ticket;
        };

        const purchaseTicket = () => {
            if (selectedTicket.value) {
                // TODO: Implement ticket purchase logic
                console.log("Ticket purchased:", selectedTicket.value);
            }
        };

        return {
            tickets,
            selectedTicket,
            selectTicket,
            purchaseTicket,
        };
    },
};
</script>

<style scoped>
.user-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.ticket-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}

.ticket-details {
    margin-top: 20px;
}

button {
    margin-top: 10px;
}
</style>
