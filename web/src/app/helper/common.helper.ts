export class CommonHelper {

    public static getFormDataOptions(files: File[], data: any = null): FormData {
        const formData: FormData = new FormData();
        if (files && files.length) {
            for (const file of files) {
                formData.append('file', file);
            }
        }

        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property) && data[property] != null && data[property] !== undefined) {
                    if (Array.isArray(data[property]) || typeof data[property] === 'object') {
                        formData.append(property, JSON.stringify(data[property]));
                    } else {
                        formData.append(property, data[property]);
                    }
                }
            }
        }

        return formData;
    }
}
