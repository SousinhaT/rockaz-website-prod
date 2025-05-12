<template lang="">
    <div class="stream-frame">
        <div class="stream-player">
            <div class="stream-frame-top">
            <iframe 
                src="https://player.kick.com/rockaz69" 
                height="720px" 
                width="1280px"
                frameborder="0" 
                scrolling="no" 
                allowfullscreen="true"> 
            </iframe>
            </div>
            <div class="stream-frame-bottom">
                <div class="stream-frame-bottom-left">
                    <h3>🎰 MASSIVE BONUS HUNT! $25,000 START! 🎰</h3>
                    <p><i class="fa-solid fa-clock"></i> Live for 2h 34min <i class="fa-solid fa-user"></i> 120 viewers <i class="fa-solid fa-award"></i> Slots</p>
                </div>
                <div class="stream-frame-bottom-right">

                </div>
            </div>
        </div>
        <div class="stream-chat">
            <div class="stream-chat-top">
                <h4>Stream Chat</h4>
                <button>Live</button>
            </div>
            <div class="stream-chat-bottom">
                <div class="stream-chat-message" v-for="message in messages">
                    <p> 
                        <img src="https://i.imgur.com/3oUlbqA.png" style="filter: brightness(0) saturate(100%) invert(13%) sepia(12%) saturate(5389%) hue-rotate(229deg) brightness(93%) contrast(97%);" v-if="message.owner"/>
                        <img src="https://i.imgur.com/QDQgh8C.png" style="filter: brightness(0) saturate(100%) invert(96%) sepia(99%) saturate(1650%) hue-rotate(108deg) brightness(101%) contrast(107%);" v-if="message.mod"/>
                        <img src="https://i.imgur.com/oQX5KZn.png" style="filter: brightness(0) saturate(100%) invert(63%) sepia(30%) saturate(6707%) hue-rotate(83deg) brightness(115%) contrast(127%);" v-if="message.sub"/>
                        <span :style="{ color: message.color }">{{message.user}}</span>: {{message.text}}
                    </p>
                </div>
            </div>
            <div class="stream-chat-bottom-message">
                <input type="text" placeholder="Send a Message" v-model="message"/>
                <button @click="addToChat()"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            messages: [
                {user: 'Rockaz69', text: 'Como estámos cracudos?', color: 'green', mod:false, sub:false, owner:true},
                {user: 'Terror', text: 'Como estámos cracudos?', color: 'green', mod:true, sub:true, owner:false}
            ],
            message: "",
        }
    },
    methods: {
        addToChat(){
            this.messages.push({
                    user: 'Janito', // Or get the username dynamically
                    text: this.message,
                    color: 'white', // Or any logic for color
                    mod: false,
                    sub: false,
                    owner: false
                });
                this.message = ""; // Clear input after sending
        }
    },
}
</script>
<style lang="">
    
</style>