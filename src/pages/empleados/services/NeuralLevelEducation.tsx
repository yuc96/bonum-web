export interface TrainingData {
    input: string;
    output: string;
}

export class NeuralLevelEducation {
    private weights: Map<string, Map<string, number>>;
    private validOutputs: Set<string>;
    private threshold: number = 0.6;

    constructor() {
        this.weights = new Map();
        // Inicializar con los valores válidos del enum del modelo
        this.validOutputs = new Set([
            'Ninguno',
            'Primaria',
            'Secundaria',
            'Técnico',
            'Tecnológico',
            'Universitario',
            'Posgrado',
            'Doctorado'
        ]);

        // Entrenar con datos conocidos
        this.trainNetwork([
            // Universitario
            { input: 'uni', output: 'Universitario' },
            { input: 'universidad', output: 'Universitario' },
            { input: 'superior', output: 'Universitario' },
            { input: 'pregrado', output: 'Universitario' },

            // Secundaria
            { input: 'secu', output: 'Secundaria' },
            { input: 'bachiller', output: 'Secundaria' },
            { input: 'colegio', output: 'Secundaria' },
            { input: 'preparatoria', output: 'Secundaria' },

            // Primaria
            { input: 'bas', output: 'Primaria' },
            { input: 'basica', output: 'Primaria' },
            { input: 'primaria', output: 'Primaria' },
            { input: 'escuela', output: 'Primaria' },

            // Posgrado
            { input: 'pos', output: 'Posgrado' },
            { input: 'postgrado', output: 'Posgrado' },
            { input: 'maestria', output: 'Posgrado' },
            { input: 'master', output: 'Posgrado' },

            // Doctorado
            { input: 'doc', output: 'Doctorado' },
            { input: 'phd', output: 'Doctorado' },
            { input: 'doctorado', output: 'Doctorado' },

            // Tecnológico
            { input: 'tec', output: 'Tecnológico' },
            { input: 'tecno', output: 'Tecnológico' },
            { input: 'tecnico', output: 'Tecnológico' },
            { input: 'tecnologico', output: 'Tecnológico' }
        ]);
    }

    private normalizeInput(input: string): string[] {
        const normalized = input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, ' ')
            .replace(/r+/g, 'r')
            .trim()
            .split(/\s+/);

        return normalized;
    }

    private trainNetwork(trainingData: TrainingData[]): void {
        this.weights.clear();

        trainingData.forEach(({ input, output }) => {
            const tokens = this.normalizeInput(input);

            tokens.forEach(token => {
                if (!this.weights.has(token)) {
                    this.weights.set(token, new Map());
                }

                const tokenWeights = this.weights.get(token)!;

                this.validOutputs.forEach(validOutput => {
                    const currentWeight = tokenWeights.get(validOutput) || 0;
                    if (validOutput === output) {
                        tokenWeights.set(validOutput, currentWeight + 1);
                    } else {
                        tokenWeights.set(validOutput, currentWeight - 0.1);
                    }
                });
            });
        });

        // Normalizar pesos
        this.weights.forEach(tokenWeights => {
            const maxWeight = Math.max(...Array.from(tokenWeights.values()));
            tokenWeights.forEach((weight, output) => {
                tokenWeights.set(output, weight / maxWeight);
            });
        });
    }

    public predict(input: string | null | undefined): {
        prediction: string;
        confidence: number;
        alternatives: Array<{ value: string; confidence: number }>;
    } {
        if (!input || input.trim() === '') {
            return {
                prediction: 'Ninguno',
                confidence: 1,
                alternatives: []
            };
        }

        const tokens = this.normalizeInput(input);
        const scores = new Map<string, number>();

        // Inicializar scores
        this.validOutputs.forEach(output => {
            scores.set(output, 0);
        });

        // Verificar coincidencia exacta después de normalización
        const normalizedInput = tokens.join(' ');
        for (const [token, weights] of this.weights.entries()) {
            if (normalizedInput.includes(token)) {
                weights.forEach((weight, output) => {
                    scores.set(output, (scores.get(output) || 0) + weight);
                });
            }
        }

        // Normalizar scores
        const maxScore = Math.max(...Array.from(scores.values()));
        if (maxScore === 0) {
            return {
                prediction: 'Ninguno',
                confidence: 1,
                alternatives: []
            };
        }

        // Ordenar resultados por confianza
        const results = Array.from(scores.entries())
            .map(([value, score]) => ({
                value,
                confidence: score / maxScore
            }))
            .sort((a, b) => b.confidence - a.confidence);

        const bestMatch = results[0];

        // Solo retornar una predicción si supera el umbral
        if (bestMatch.confidence < this.threshold) {
            return {
                prediction: 'Ninguno',
                confidence: 1,
                alternatives: results
            };
        }

        return {
            prediction: bestMatch.value,
            confidence: bestMatch.confidence,
            alternatives: results.slice(1)
        };
    }

    // Método para agregar nuevos patrones de aprendizaje
    public addTrainingData(newData: TrainingData[]): void {
        this.trainNetwork(newData);
    }
}

// Ejemplo de uso:

