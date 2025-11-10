import { axiosellider } from "../Axios/Axios";

export const getPatientLabResults = async () => {
    try {
        const result = await axiosellider.get(`/medlab/getpatientlabresult`);
        const { success, data } = result.data;
        if (success === 2) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error in Fetching Patient Lab Results", error)
        return [];
    }
};

// function to group the incoming Data
export const groupPatientLabResults = (Patientlabresults) => {
    if (!Array.isArray(Patientlabresults)) return [];

    const grouped = Patientlabresults?.reduce((acc, item) => {
        // extracting patient Number
        const ptNo = item.PT_NO;

        // creating test object
        const test = {
            code: item.PD_CODE,
            name: item.PDC_DESC,
            bmc_slno: item.BMC_SLNO,
            result: item.TSC_CHECKED,
            doctor_viewed: item.TDC_DOCTORVIEW
        };
        return {
            ...acc, // Keep all previously grouped patients
            [ptNo]: acc[ptNo]  // For the current patient (ptNo), check if we've already seen them
                ? {
                    ...acc[ptNo], // If already exists, copy their existing data
                    tests: [...acc[ptNo].tests, test]  // Add the new test to their existing tests array 
                }
                : {
                    pt_no: ptNo,
                    name: item.PTC_NAME,  // If this is the first time we're seeing this patient, create a new entry
                    tests: [test] // Start with one test
                }
        };
    }, {});

    // return array of grouped patients
    return Object.values(grouped);
};

