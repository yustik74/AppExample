import {IExternalSettings} from "@/scripts/Server";
import {ServiceConnector} from "@/scripts/ServiceConnector";

declare module 'vue/types/vue' {
    interface Vue {
        $settings: IExternalSettings;
        L: any;
        $serviceConnector: ServiceConnector;
    }
}