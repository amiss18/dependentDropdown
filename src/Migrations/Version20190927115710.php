<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190927115710 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP INDEX IDX_E2E2D1EECCF9E01E');
        $this->addSql('CREATE TEMPORARY TABLE __temp__commune AS SELECT id, departement_id, lon, lat, nom, code_departement, code_region, population, codes_postaux FROM commune');
        $this->addSql('DROP TABLE commune');
        $this->addSql('CREATE TABLE commune (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, departement_id INTEGER NOT NULL, lon BIGINT NOT NULL, lat BIGINT NOT NULL, nom VARCHAR(255) NOT NULL COLLATE BINARY, code_departement VARCHAR(3) NOT NULL COLLATE BINARY, code_region VARCHAR(2) NOT NULL COLLATE BINARY, population BIGINT NOT NULL, codes_postaux CLOB NOT NULL COLLATE BINARY --(DC2Type:array)
        , CONSTRAINT FK_E2E2D1EECCF9E01E FOREIGN KEY (departement_id) REFERENCES departement (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO commune (id, departement_id, lon, lat, nom, code_departement, code_region, population, codes_postaux) SELECT id, departement_id, lon, lat, nom, code_departement, code_region, population, codes_postaux FROM __temp__commune');
        $this->addSql('DROP TABLE __temp__commune');
        $this->addSql('CREATE INDEX IDX_E2E2D1EECCF9E01E ON commune (departement_id)');
        $this->addSql('DROP INDEX IDX_C1765B6398260155');
        $this->addSql('DROP INDEX UNIQ_C1765B6370E4A9D4');
        $this->addSql('DROP INDEX UNIQ_C1765B6377153098');
        $this->addSql('CREATE TEMPORARY TABLE __temp__departement AS SELECT id, region_id, code, code_region, nom FROM departement');
        $this->addSql('DROP TABLE departement');
        $this->addSql('CREATE TABLE departement (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, region_id INTEGER NOT NULL, code VARCHAR(3) NOT NULL COLLATE BINARY, code_region VARCHAR(2) NOT NULL COLLATE BINARY, nom VARCHAR(255) NOT NULL COLLATE BINARY, CONSTRAINT FK_C1765B6398260155 FOREIGN KEY (region_id) REFERENCES region (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO departement (id, region_id, code, code_region, nom) SELECT id, region_id, code, code_region, nom FROM __temp__departement');
        $this->addSql('DROP TABLE __temp__departement');
        $this->addSql('CREATE INDEX IDX_C1765B6398260155 ON departement (region_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C1765B6377153098 ON departement (code)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP INDEX IDX_E2E2D1EECCF9E01E');
        $this->addSql('CREATE TEMPORARY TABLE __temp__commune AS SELECT id, departement_id, lon, lat, nom, code_departement, code_region, population, codes_postaux FROM commune');
        $this->addSql('DROP TABLE commune');
        $this->addSql('CREATE TABLE commune (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, departement_id INTEGER NOT NULL, lon BIGINT NOT NULL, lat BIGINT NOT NULL, nom VARCHAR(255) NOT NULL, code_departement VARCHAR(3) NOT NULL, code_region VARCHAR(2) NOT NULL, population BIGINT NOT NULL, codes_postaux CLOB NOT NULL --(DC2Type:array)
        )');
        $this->addSql('INSERT INTO commune (id, departement_id, lon, lat, nom, code_departement, code_region, population, codes_postaux) SELECT id, departement_id, lon, lat, nom, code_departement, code_region, population, codes_postaux FROM __temp__commune');
        $this->addSql('DROP TABLE __temp__commune');
        $this->addSql('CREATE INDEX IDX_E2E2D1EECCF9E01E ON commune (departement_id)');
        $this->addSql('DROP INDEX UNIQ_C1765B6377153098');
        $this->addSql('DROP INDEX IDX_C1765B6398260155');
        $this->addSql('CREATE TEMPORARY TABLE __temp__departement AS SELECT id, region_id, code, code_region, nom FROM departement');
        $this->addSql('DROP TABLE departement');
        $this->addSql('CREATE TABLE departement (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, region_id INTEGER NOT NULL, code VARCHAR(3) NOT NULL, code_region VARCHAR(2) NOT NULL, nom VARCHAR(255) NOT NULL)');
        $this->addSql('INSERT INTO departement (id, region_id, code, code_region, nom) SELECT id, region_id, code, code_region, nom FROM __temp__departement');
        $this->addSql('DROP TABLE __temp__departement');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C1765B6377153098 ON departement (code)');
        $this->addSql('CREATE INDEX IDX_C1765B6398260155 ON departement (region_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C1765B6370E4A9D4 ON departement (code_region)');
    }
}
