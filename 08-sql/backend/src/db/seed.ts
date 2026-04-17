import { db } from "./database.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    modality TEXT NOT NULL CHECK(modality IN ('remote', 'onsite', 'hybrid')),
    level TEXT NOT NULL CHECK(level IN ('junior', 'mid', 'senior'))
  );

  CREATE TABLE IF NOT EXISTS job_technologies (
    job_id TEXT NOT NULL,
    technology TEXT NOT NULL,
    PRIMARY KEY (job_id, technology),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS job_content (
    job_id TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    requirements TEXT NOT NULL,
    about TEXT NOT NULL,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
  );
`)

const insertJob = db.prepare(`
  INSERT OR IGNORE INTO jobs (id, title, company, location, description, modality, level)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

const insertTech = db.prepare(`
  INSERT OR IGNORE INTO job_technologies (job_id, technology) VALUES (?, ?)
`)


const insertContent = db.prepare(`
  INSERT OR IGNORE INTO job_content (job_id, description, responsibilities, requirements, about)
  VALUES (?, ?, ?, ?, ?)
`)

const seed = db.transaction(() => {
  // Job 1
  insertJob.run('1', 'Senior Frontend Developer', 'Tech Corp', 'Madrid, Spain',
    'Looking for a senior frontend developer', 'hybrid', 'senior')
  insertTech.run('1', 'React')
  insertTech.run('1', 'TypeScript')
  insertTech.run('1', 'CSS')
  insertContent.run('1', 
    'Detailed description for Senior Frontend Developer',
    'Develop clean code, lead team',
    '5+ years experience, React expertise',
    'Innovative tech company specializing in AI'
  )

  // Job 2
  insertJob.run('2', 'Full Stack Developer', 'StartupX', 'Remote',
    'Join our team as a full stack developer', 'remote', 'mid')
  insertTech.run('2', 'Node.js')
  insertTech.run('2', 'React')
  insertTech.run('2', 'PostgreSQL')
  insertContent.run('2',
    'Exciting role in a fast-paced startup',
    'Build end-to-end features',
    '3+ years experience, Node and React knowledge',
    'Disruptive startup changing the world'
  )

  // Job 3
  insertJob.run('3', 'Junior Backend Developer', 'FinTech Solutions', 'Barcelona, Spain',
    'Great opportunity for junior developers', 'onsite', 'junior')
  insertTech.run('3', 'Node.js')
  insertTech.run('3', 'TypeScript')
  insertTech.run('3', 'MongoDB')
  insertContent.run('3',
    'Perfect entry-level role for backend enthusiasts',
    'Assist in API development, write tests',
    'Knowledge of JavaScript, curiosity to learn',
    'Leader in financial technology services'
  )
})

seed()

console.log('Base de datos inicializada')