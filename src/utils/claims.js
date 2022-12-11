export const GET_CLAIM_NAME = (string) => {
    const claims = {
        Users: "Користувачi",
        Ovops: "ОВОП",
        HiChannels: "Канали HI",
        Alarms: "Аварії",
        Targets: "Об'єкти",
        CurrentCalls: "Потокові дзвінки",
        Synchronizations: "Аудит та синхронізація",
    };
    if (!claims[string]) return string;
    return claims[string];
};

export const POSSIBLE_CLAIMS = () => {
    return ["Users", "Ovops", "HiChannels", "Alarms", "Targets", "CurrentCalls", "Synchronizations"];
};
