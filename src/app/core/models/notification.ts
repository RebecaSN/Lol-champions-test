import { UtilitiesService } from "../services/utilities/utilities.service";

export class Notification {
  public id: number;
    public header: string;
    public body: string;
    public isRead: boolean;
    public isPinned: boolean;
    public date: Date;

    public static Create(data: {}) {
        const n = new Notification();
        Object.assign(n, data);

        if (n.date) {
            n.date = UtilitiesService.parseDate(n.date);
        }
        return n;
    }
}
