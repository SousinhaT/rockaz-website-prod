<template lang="">
    <div class="bonus-hunt-frame">
        <div class="bonus-hunt-frame-top">
            <div id="hunt-top">
                <h2><i class="fa-solid fa-crown"></i> Bonus Hunt<span id="special-colored-span">.</span></h2>
            </div>
            <div id="hunt-top-bottom">
                <div id="widget-current-bh-text">
                    <h2><i class="fa-solid fa-trophy" style="color:gold"></i> Current Bonus Hunt</h2>
                    <h4>Join us on this epic bonus hunt with massive potential!</h4>
                </div>
                <div id="widget-current-bh-info">
                    <div>
                        <h4>Balance</h4>
                        <h3>{{lastBonus[0].played_Balance}}€</h3>
                    </div>
                    <div>
                        <h4>Start BE</h4>
                        <h3>{{Math.round(lastBonus[0].start_Be)}}x</h3>
                    </div>
                    <div>
                        <h4>Slots</h4>
                        <h3>{{lastBonus[0].bonus_Quantity}}</h3>
                    </div>
                    <div>
                        <button @click="gotoBonus(lastBonus[0].id)">Watch</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bonus-hunt-frame-bottom">
            <div class="bonus-hunt-widget" v-for="bonus in lastBonus">
                <div class="bonus-hunt-widget-l">
                    <button @click="gotoBonus(bonus.id)">{{bonus.name + ' #' + bonus.user_Count}}</button @click="">
                    <p>{{bonus.created_At.split('T')[0]}}</p>
                </div>

                <div class="bonus-hunt-widget-r">
                    <div class="bonus-hunt-widget-r-div">
                        <div class="bonus-hunt-widget-r-div-t">
                            <h3>Start Balance</h3>
                        </div>
                        <div class="bonus-hunt-widget-r-div-b">
                            <h3>{{bonus.played_Balance}}€</h3>
                        </div>
                    </div>
                    <div class="bonus-hunt-widget-r-div">
                        <div class="bonus-hunt-widget-r-div-t">
                            <h3>End Balance</h3>
                        </div>
                        <div class="bonus-hunt-widget-r-div-b">
                            <h3>{{Math.round(bonus.total_Payment)}}€</h3>
                        </div>
                    </div>
                    <div class="bonus-hunt-widget-r-div">
                        <div class="bonus-hunt-widget-r-div-t">
                            <h3>Difference</h3>
                        </div>
                        <div class="bonus-hunt-widget-r-div-b">
                            <h3 
                            :class="bonus.difference > 0 ? 'positive' : bonus.difference < 0 ? 'negative' : 'neutral'"
                            >
                            {{ Math.round(bonus.difference) }}€
                            </h3>
                        </div>
                    </div>
                    <div class="bonus-hunt-widget-r-div">
                        <div class="bonus-hunt-widget-r-div-t">
                            <h3>AVG. Multiplier</h3>
                        </div>
                        <div class="bonus-hunt-widget-r-div-b">
                            <h3>{{Math.round(bonus.average_Multiplier)}}x</h3>
                        </div>
                    </div>
                    <div class="bonus-hunt-widget-r-div">
                        <div class="bonus-hunt-widget-r-div-t">
                            <h3>Start BE</h3>
                        </div>
                        <div class="bonus-hunt-widget-r-div-b">
                            <h3>{{Math.round(bonus.start_Be)}}x</h3>
                        </div>
                    </div>
                    <div class="bonus-hunt-widget-r-div">
                        <div class="bonus-hunt-widget-r-div-t">
                            <h3>Slots</h3>
                        </div>
                        <div class="bonus-hunt-widget-r-div-b">
                            <h3>{{bonus.bonus_Quantity}}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bonus-hunt-widget" style="margin-bottom:1rem; height: 100px;">
                <div class="bonus-hunt-widget-l">
                    <button @click="gotoProfile()">See More</button>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
    data() {
        return {
            lastBonus:[
                        {
                            "id": "bfe3b9cd-99e1-4b4d-be5e-f0db1da322ed",
                            "name": "BonusHunt",
                            "currency_Code": "EUR",
                            "currency_Symbol": "€",
                            "played_Balance": 5000,
                            "total_Payment": 5749.25,
                            "difference": 749.25,
                            "average_Multiplier": 65.33238636363636,
                            "start_Be": 56.81818181818182,
                            "user_Count": 171,
                            "bonus_Quantity": 37,
                            "created_At": "2025-05-07T09:38:00",
                            "premium": true,
                            "public": true
                        },
                        {
                            "id": "dd40c1ac-0869-4925-876b-f4600f71f1b7",
                            "name": "BonusHunt",
                            "currency_Code": "EUR",
                            "currency_Symbol": "€",
                            "played_Balance": 5000,
                            "total_Payment": 2994.32,
                            "difference": -2005.6799999999998,
                            "average_Multiplier": 61.233537832310844,
                            "start_Be": 102.24948875255625,
                            "user_Count": 170,
                            "bonus_Quantity": 31,
                            "created_At": "2025-05-06T09:24:05",
                            "premium": true,
                            "public": true
                        },
                        {
                            "id": "0d382316-af3a-443d-9d5e-2c67d9b01874",
                            "name": "BonusHunt",
                            "currency_Code": "EUR",
                            "currency_Symbol": "€",
                            "played_Balance": 12000,
                            "total_Payment": 9751.4,
                            "difference": -2248.6000000000004,
                            "average_Multiplier": 75.01076923076923,
                            "start_Be": 92.3076923076923,
                            "user_Count": 169,
                            "bonus_Quantity": 33,
                            "created_At": "2025-05-05T09:34:48",
                            "premium": true,
                            "public": true
                        },
                        {
                            "id": "b6cbef4f-873f-40a1-b387-d5c14480b578",
                            "name": "BonusHunt",
                            "currency_Code": "EUR",
                            "currency_Symbol": "€",
                            "played_Balance": 13000,
                            "total_Payment": 12177.25,
                            "difference": -822.75,
                            "average_Multiplier": 77.56210191082802,
                            "start_Be": 82.80254777070064,
                            "user_Count": 168,
                            "bonus_Quantity": 42,
                            "created_At": "2025-05-02T09:01:08",
                            "premium": true,
                            "public": true
                        },
                        {
                            "id": "c1c785d6-6ef2-45fd-a027-f4991504a74f",
                            "name": "BonusHunt",
                            "currency_Code": "EUR",
                            "currency_Symbol": "€",
                            "played_Balance": 14000,
                            "total_Payment": 13184.800000000001,
                            "difference": -815.1999999999989,
                            "average_Multiplier": 124.38490566037737,
                            "start_Be": 132.0754716981132,
                            "user_Count": 167,
                            "bonus_Quantity": 37,
                            "created_At": "2025-05-01T08:07:54",
                            "premium": true,
                            "public": true
                        },
                        {
                            "id": "7137873a-a4e1-4092-9542-9a0f9da28a49",
                            "name": "BonusHunt",
                            "currency_Code": "EUR",
                            "currency_Symbol": "€",
                            "played_Balance": 5000,
                            "total_Payment": 9257.460000000001,
                            "difference": 4257.460000000001,
                            "average_Multiplier": 151.51325695581016,
                            "start_Be": 81.83306055646482,
                            "user_Count": 166,
                            "bonus_Quantity": 30,
                            "created_At": "2025-04-30T09:40:49",
                            "premium": true,
                            "public": true
                        },
                        {
                            "id": "868e4685-0c38-44ed-8ca5-da20a483c4b4",
                            "name": "BonusHunt",
                            "currency_Code": "EUR",
                            "currency_Symbol": "€",
                            "played_Balance": 6000,
                            "total_Payment": 4912,
                            "difference": -1088,
                            "average_Multiplier": 88.98550724637683,
                            "start_Be": 108.69565217391306,
                            "user_Count": 165,
                            "bonus_Quantity": 32,
                            "created_At": "2025-04-29T08:51:03",
                            "premium": true,
                            "public": true
                        },
                        {
                            "id": "6e9c249f-8d15-4e35-8b9e-92be58e65fff",
                            "name": "BonusHunt",
                            "currency_Code": "EUR",
                            "currency_Symbol": "€",
                            "played_Balance": 5000,
                            "total_Payment": 6363.400000000001,
                            "difference": 1363.4000000000005,
                            "average_Multiplier": 71.49887640449438,
                            "start_Be": 56.17977528089887,
                            "user_Count": 164,
                            "bonus_Quantity": 35,
                            "created_At": "2025-04-28T09:34:14",
                            "premium": true,
                            "public": true
                        },
                        {
                            "id": "fb0cc3c0-49d3-45c5-b6b7-f0be89cc68c1",
                            "name": "BonusHunt",
                            "currency_Code": "EUR",
                            "currency_Symbol": "€",
                            "played_Balance": 1500,
                            "total_Payment": 1374.26,
                            "difference": -125.74000000000001,
                            "average_Multiplier": 118.47068965517242,
                            "start_Be": 129.31034482758622,
                            "user_Count": 163,
                            "bonus_Quantity": 24,
                            "created_At": "2025-04-25T09:34:33",
                            "premium": true,
                            "public": true
                        },
                        {
                            "id": "ff1e9c6c-88b7-4952-b69f-e4b3c92768da",
                            "name": "BonusHunt",
                            "currency_Code": "EUR",
                            "currency_Symbol": "€",
                            "played_Balance": 3000,
                            "total_Payment": 2523.67,
                            "difference": -476.3299999999999,
                            "average_Multiplier": 100.14563492063488,
                            "start_Be": 119.04761904761898,
                            "user_Count": 162,
                            "bonus_Quantity": 25,
                            "created_At": "2025-04-24T10:00:16",
                            "premium": true,
                            "public": true
                        }
                    ]
        }
    },
    methods: {
        gotoBonus(url){
            const string = 'https://hunthub.net/bonushunt/' + url
            window.open(string, '_blank');     
        },
        gotoProfile(){
            const string = 'https://hunthub.net/profile/bb0c47cf-347f-4ec9-9d98-4e77213ac057'
            window.open(string, '_blank'); 
        }
    },
}
</script>
<style scoped>

</style>