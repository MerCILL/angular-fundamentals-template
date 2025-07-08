import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: number): string {
        if (!value || value < 0) {
            return '00:00 hours';
        }
        
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        
        const hoursFormatted = hours.toString().padStart(2, '0');
        const minutesFormatted = minutes.toString().padStart(2, '0');
        
        const hoursText = hours === 1 ? 'hour' : 'hours';
        
        return `${hoursFormatted}:${minutesFormatted} ${hoursText}`;
    }
}