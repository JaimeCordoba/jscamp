// ================================
// MODELO DE JOB
// ================================

import crypto from "node:crypto";
import { db } from "../db/database.js";
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters } from "../types.js";

export class JobModel {
	// Obtener todos los jobs con filtros opcionales
	static async getAll(filters?: JobFilters): Promise<Job[]> {
		let query = `
      SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies
      FROM jobs j
      LEFT JOIN job_technologies jt ON j.id = jt.job_id
    `;

		const conditions: string[] = [];
		const params: unknown[] = [];

		if (filters?.tech) {
			conditions.push(`j.id IN (SELECT job_id FROM job_technologies WHERE technology = ?)`);
			params.push(filters.tech);
		}

		if (filters?.modality) {
			conditions.push(`j.modality = ?`);
			params.push(filters.modality);
		}

		if (filters?.level) {
			conditions.push(`j.level = ?`);
			params.push(filters.level);
		}

		if (conditions.length > 0) {
			query += " WHERE " + conditions.join(" AND ");
		}

		query += " GROUP BY j.id";

		const rows = db.prepare(query).all(...params) as any[];

		return rows.map((row) => ({
			id: row.id,
			title: row.title,
			company: row.company,
			location: row.location,
			description: row.description,
			data: {
				technology: row.technologies ? row.technologies.split(",") : [],
				modality: row.modality,
				level: row.level,
			},
		}));
	}

	// Obtener un job por ID
	static async getById(id: string): Promise<Job | undefined> {
		const query = `
      SELECT j.*, 
             GROUP_CONCAT(jt.technology) AS technologies,
             jc.description as content_desc, 
             jc.responsibilities, 
             jc.requirements, 
             jc.about
      FROM jobs j
      LEFT JOIN job_technologies jt ON j.id = jt.job_id
      LEFT JOIN job_content jc ON j.id = jc.job_id
      WHERE j.id = ?
      GROUP BY j.id
    `;
		const row = db.prepare(query).get(id) as any;

		if (!row) return undefined;

		const job: Job = {
			id: row.id,
			title: row.title,
			company: row.company,
			location: row.location,
			description: row.description,
			data: {
				technology: row.technologies ? row.technologies.split(",") : [],
				modality: row.modality,
				level: row.level,
			},
		};

		if (row.content_desc) {
			job.content = {
				description: row.content_desc,
				responsibilities: row.responsibilities,
				requirements: row.requirements,
				about: row.about,
			};
		}

		return job;
	}

	// Crear un nuevo job
	static async create(input: CreateJobDTO): Promise<Job> {
		const id = crypto.randomUUID();
		const { title, company, location, description, data } = input;
		const { technology, modality, level } = data;

		// Transacción para asegurar integridad
		const insertTransaction = db.transaction(() => {
			db.prepare(
				`
        INSERT INTO jobs (id, title, company, location, description, modality, level)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
			).run(id, title, company, location, description, modality, level);

			const insertTech = db.prepare(`
        INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)
      `);

			for (const tech of technology) {
				insertTech.run(id, tech);
			}
		});

		insertTransaction();

		return { id, ...input };
	}

	// Eliminar un job
	static async delete(id: string): Promise<boolean> {
		const result = db.prepare("DELETE FROM jobs WHERE id = ?").run(id);
		return result.changes > 0;
	}

	// Actualizar un job
	static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
		const job = await this.getById(id);
		if (!job) return null;

		const updatedJob = { ...job, ...input };
		if (input.data) {
			updatedJob.data = { ...job.data, ...input.data };
		}

		const { title, company, location, description, data } = updatedJob;
		const { modality, level, technology } = data;

		const updateTransaction = db.transaction(() => {
			db.prepare(
				`
        UPDATE jobs 
        SET title = ?, company = ?, location = ?, description = ?, modality = ?, level = ?
        WHERE id = ?
      `,
			).run(title, company, location, description, modality, level, id);

			if (input.data?.technology) {
				db.prepare("DELETE FROM job_technologies WHERE job_id = ?").run(id);
				const insertTech = db.prepare("INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)");
				for (const tech of input.data.technology) {
					insertTech.run(id, tech);
				}
			}
		});

		updateTransaction();

		return this.getById(id) as Promise<Job>;
	}
}
