export interface ColumnMapping {
    originalName: string;
    normalizedName: string;
    score: number;
}

export class ColumnMatcher {
    private fieldMappings = {
        'identification_number': [
            'identificacion', 'cedula', 'dni', 'id', 'numero_identificacion',
            'identification', 'identity', 'document', 'documento', 'ruc'
        ],
        'name': [
            'nombre', 'nombres', 'first_name', 'firstname', 'primer_nombre',
            'name', 'given_name', 'nombre 1', 'primer nombre'
        ],
        'temporalName2': [
            'nombre 2', 'segundo_nombre', 'second_name', 'secondname',
            'segundo nombre', 'name 2', 'middle_name'
        ],
        'lastname': [
            'apellido', 'apellidos', 'last_name', 'lastname', 'surname',
            'family_name', 'primer_apellido', 'apellido 1', 'primer apellido'
        ],
        'temporalLastname2': [
            'apellido 2', 'segundo_apellido', 'second_lastname', 'segundo apellido',
            'lastname 2', 'second_surname', 'apellido_materno'
        ],
        'address': [
            'direccion', 'domicilio', 'address', 'location', 'ubicacion',
            'residencia', 'home_address', 'direccion_residencia', 'direccion_domicilio',
            'street_address', 'residential_address', 'dir', 'dirección', 'direccón',
            'direccion_particular', 'lugar_residencia'
        ],
        'date_of_birth': [
            'fecha_nacimiento', 'nacimiento', 'birth_date', 'birthdate',
            'dob', 'fecha_nac', 'birth', 'born'
        ],
        'level_education': [
            'educacion', 'nivel_educativo', 'education', 'education_level',
            'estudios', 'nivel_academico', 'academic_level', 'escolaridad'
        ],
        'email': [
            'correo', 'email', 'e-mail', 'mail', 'correo_electronico',
            'electronic_mail', 'emailaddress'
        ],
        'phoneMovil': [
            'celular', 'movil', 'telefono_movil', 'mobile', 'mobile_phone',
            'phone', 'cellular', 'tel_movil', 'numero_telefono', 'num_tel',
            'telefono_contacto', 'tel_contacto', 'phone_number', 'contact_phone',
            'tel', 'telf', 'teléfono', 'numero_celular', 'num_celular',
            'num_movil', 'tel_celular','numero'
        ],
        'job_title': [
            'cargo', 'puesto', 'position', 'job', 'role', 'titulo',
            'ocupacion', 'job_position', 'job_role'
        ],
        'gross_salary': [
            'salario_bruto', 'sueldo_bruto', 'gross_salary', 'salary',
            'salario', 'sueldo', 'remuneracion_bruta'
        ],
        'net_salary': [
            'salario_neto', 'sueldo_neto', 'net_salary', 'take_home',
            'salario_liquido', 'sueldo_liquido'
        ],
        'other_income': [
            'otros_ingresos', 'otros_ingresos_mensuales', 'otros_ingresos_anuales',
            'otros_ingresos_brutos', 'otros_ingresos_netos','otros ingresos (annual)'
        ]
    };

    private calculateSimilarity(str1: string, str2: string): number {
        if (!str1 || !str2) return 0;

        const s1 = str1.toLowerCase().replace(/[^a-z0-9áéíóúñ]/g, '');
        const s2 = str2.toLowerCase().replace(/[^a-z0-9áéíóúñ]/g, '');

        if (s1 === s2) return 1;

        // Levenshtein Distance
        const matrix: number[][] = [];
        for (let i = 0; i <= s1.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= s2.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= s1.length; i++) {
            for (let j = 1; j <= s2.length; j++) {
                if (s1[i - 1] === s2[j - 1]) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        const maxLength = Math.max(s1.length, s2.length);
        return 1 - matrix[s1.length][s2.length] / maxLength;
    }

    private findBestMatch(columnName: string): ColumnMapping {
        let bestMatch = {
            originalName: columnName,
            normalizedName: columnName,
            score: 0
        };

        for (const [fieldName, alternatives] of Object.entries(this.fieldMappings)) {
            for (const alt of alternatives) {
                const similarity = this.calculateSimilarity(columnName, alt);
                if (similarity > bestMatch.score) {
                    bestMatch = {
                        originalName: columnName,
                        normalizedName: fieldName,
                        score: similarity
                    };
                }
            }
        }

        return bestMatch;
    }

    public matchColumns(headers: string[]): Map<string, string> {
        const mappings = new Map<string, string>();
        const usedFields = new Set<string>();

        // Ordenar headers por longitud para priorizar coincidencias más específicas
        const sortedHeaders = [...headers].sort((a, b) => b.length - a.length);

        // Primera pasada: coincidencias con alta confianza (umbral aumentado)
        sortedHeaders.forEach(header => {
            const match = this.findBestMatch(header);
            if (match.score > 0.90 && !usedFields.has(match.normalizedName)) {
                mappings.set(header, match.normalizedName);
                usedFields.add(match.normalizedName);
            }
        });

        // Segunda pasada: coincidencias con menor confianza
        headers.forEach(header => {
            if (!mappings.has(header)) {
                const match = this.findBestMatch(header);
                if (match.score > 0.70 && !usedFields.has(match.normalizedName)) {
                    mappings.set(header, match.normalizedName);
                    usedFields.add(match.normalizedName);
                }
            }
        });

        return mappings;
    }
}



/* import * as tf from '@tensorflow/tfjs';
// Interfaz para el mapeo de columnas
export interface ColumnMapping {
    originalName: string;
    normalizedName: string;
    score: number;
}

// Modelo IA: ColumnMatcher
export class ColumnMatcher {
    private trainedModel: tf.LayersModel | null = null;
    private labelEncoder: { [key: string]: number } = {};
    private reverseLabelEncoder: { [key: number]: string } = {};

    constructor(private preloadedData: { column: string; label: string }[]) {
        this.initializeLabelEncoder();
    }

    // Crea un codificador para los nombres de columnas
    private initializeLabelEncoder() {
        const uniqueLabels = [...new Set(this.preloadedData.map(d => d.label))];
        uniqueLabels.forEach((label, index) => {
            this.labelEncoder[label] = index;
            this.reverseLabelEncoder[index] = label;
        });
    }

    // Entrenar el modelo
    public async trainModel(): Promise<void> {
        const inputData = this.preloadedData.map(d => this.textToTensor(d.column));
        const outputData = this.preloadedData.map(d => this.labelEncoder[d.label]);

        const xs = tf.stack(inputData);
        const ys = tf.tensor1d(outputData, 'int32');

        const model = tf.sequential();
        model.add(
            tf.layers.dense({
                inputShape: [inputData[0].shape[0]],
                units: 128,
                activation: 'relu',
            })
        );
        model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
        model.add(tf.layers.dense({ units: Object.keys(this.labelEncoder).length, activation: 'softmax' }));

        model.compile({
            optimizer: 'adam',
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy'],
        });

        await model.fit(xs, ys, { epochs: 20 });

        this.trainedModel = model;
        xs.dispose();
        ys.dispose();
    }

    // Convertir texto a vector de características (bag-of-words simple)
    private textToTensor(text: string): tf.Tensor {
        const vocabulary = new Set(this.preloadedData.flatMap(d => d.column.split(/\W+/).map(w => w.toLowerCase())));
        const vocabArray = Array.from(vocabulary);
        const vector = new Array(vocabArray.length).fill(0);

        text.split(/\W+/).forEach(word => {
            const index = vocabArray.indexOf(word.toLowerCase());
            if (index !== -1) vector[index] = 1;
        });

        return tf.tensor1d(vector);
    }

    // Predecir el mejor campo para un encabezado
    public predict(columnName: string): ColumnMapping | null {
        if (!this.trainedModel) throw new Error('El modelo no está entrenado.');

        const inputTensor = this.textToTensor(columnName).expandDims(0);
        const prediction = this.trainedModel.predict(inputTensor) as tf.Tensor;

        const probabilities = prediction.dataSync();
        const maxIndex = probabilities.indexOf(Math.max(...probabilities));

        inputTensor.dispose();
        prediction.dispose();

        const normalizedName = this.reverseLabelEncoder[maxIndex];
        const score = probabilities[maxIndex];

        return {
            originalName: columnName,
            normalizedName,
            score,
        };
    }

    // Emparejar columnas de una lista
    public matchColumns(headers: string[]): Map<string, string> {
        if (!this.trainedModel) throw new Error('El modelo no está entrenado.');

        const mappings = new Map<string, string>();
        headers.forEach(header => {
            const match = this.predict(header);
            if (match && match.score > 0.70) {
                mappings.set(header, match.normalizedName);
            }
        });

        return mappings;
    }
}
 */
